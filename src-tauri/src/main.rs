use tauri::command;
use serde::{Deserialize, Serialize};
use reqwest::cookie::{CookieStore, Jar};
use std::sync::{Arc, Mutex};
use url::Url;
use std::fs::File;
use std::io::{self, Read, Write};

#[derive(Deserialize)]
struct LoginParams {
    encoded_credentials: String,
}

#[derive(Deserialize, Serialize)]
struct TwoFactorParams {
    code: String,
    use_email: bool,
}

#[derive(Serialize)]
struct UserResponse {
    username: Option<String>,
    requires_two_factor_auth: Option<Vec<String>>,
    message: Option<String>,
}

#[derive(Deserialize)]
struct GetRequestParams {
    url: String,
}

#[derive(Default)]
struct AppState {
    cookie_jar: Arc<Jar>,
}

impl AppState {
    fn load_cookies(&self) -> io::Result<()> {
        let mut file = File::open("cookies.json")?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        let url = Url::parse("https://api.vrchat.cloud").unwrap();
        self.cookie_jar.add_cookie_str(&contents, &url);
        Ok(())
    }

    fn save_cookies(&self) -> io::Result<()> {
        let url = Url::parse("https://api.vrchat.cloud").unwrap();
        let cookies = self.cookie_jar.cookies(&url).unwrap_or_else(|| "".to_string().parse().unwrap());
        let mut file = File::create("cookies.json")?;
        file.write_all(cookies.as_bytes())?;
        Ok(())
    }
}

#[command]
async fn login(params: LoginParams, state: tauri::State<'_, Mutex<AppState>>) -> Result<UserResponse, String> {
    let cookie_jar = state.lock().unwrap().cookie_jar.clone();
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .cookie_provider(cookie_jar)
        .build()
        .unwrap();

    let url = Url::parse("https://api.vrchat.cloud/api/1/auth/user").unwrap();

    let response = client
        .get(url.clone())
        .header("Authorization", format!("Basic {}", params.encoded_credentials))
        .header("User-Agent", "YourAppName/1.0")
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                let user: serde_json::Value = resp.json().await.unwrap();
                state.lock().unwrap().save_cookies().unwrap(); // Save cookies after successful login
                Ok(UserResponse {
                    username: user["displayname"].as_str().map(String::from),
                    requires_two_factor_auth: user["requiresTwoFactorAuth"].as_array().map(|arr| arr.iter().map(|v| v.as_str().unwrap().to_string()).collect()),
                    message: None,
                })
            } else {
                let status = resp.status();
                let content = resp.text().await.unwrap();
                Err(format!("Login failed with status {}: {}", status, content))
            }
        }
        Err(err) => Err(format!("Request failed: {}", err)),
    }
}

#[command]
async fn verify_two_factor(params: TwoFactorParams, state: tauri::State<'_, Mutex<AppState>>) -> Result<String, String> {
    let cookie_jar = state.lock().unwrap().cookie_jar.clone();
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .cookie_provider(cookie_jar)
        .build()
        .unwrap();

    let url = if params.use_email {
        Url::parse("https://api.vrchat.cloud/api/1/auth/twofactorauth/emailotp/verify").unwrap()
    } else {
        Url::parse("https://api.vrchat.cloud/api/1/auth/twofactorauth/totp/verify").unwrap()
    };

    let response = client
        .post(url)
        .header("User-Agent", "YourAppName/1.0")
        .json(&serde_json::json!({ "code": params.code }))
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                state.lock().unwrap().save_cookies().unwrap(); // Save cookies after successful 2FA verification
                Ok("2FA verification successful".to_string())
            } else {
                let status = resp.status();
                let content = resp.text().await.unwrap();
                Err(format!("2FA verification failed with status {}: {}", status, content))
            }
        }
        Err(err) => Err(format!("Request failed: {}", err)),
    }
}

#[command]
async fn logout(state: tauri::State<'_, Mutex<AppState>>) -> Result<String, String> {
    let cookie_jar = state.lock().unwrap().cookie_jar.clone();
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .cookie_provider(cookie_jar.clone())
        .build()
        .unwrap();

    let url = Url::parse("https://api.vrchat.cloud/api/1/logout").unwrap();

    let response = client
        .put(url.clone())
        .header("User-Agent", "Spectre/1.0")
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                state.lock().unwrap().save_cookies().unwrap();
                Ok("Logged out successfully".to_string())
            } else {
                let status = resp.status();
                let content = resp.text().await.unwrap();
                Err(format!("Logout failed with status {}: {}", status, content))
            }
        }
        Err(err) => Err(format!("Request failed: {}", err)),
    }
}

#[command]
async fn get_request(state: tauri::State<'_, Mutex<AppState>>) -> Result<String, String> {
    let cookie_jar = state.lock().unwrap().cookie_jar.clone();
    let client = reqwest::Client::builder()
        .cookie_store(true)
        .cookie_provider(cookie_jar.clone())
        .build()
        .unwrap();

    let url = Url::parse("https://api.vrchat.cloud/api/1/auth/user/friends?offline=true").unwrap();

    let response = client
        .get(url)
        .header("User-Agent", "Spectre/1.0")
        .send()
        .await;

    match response {
        Ok(resp) => {
            if resp.status().is_success() {
                let body = resp.text().await.map_err(|e| format!("Failed to read response: {}", e))?;
                Ok(body)
            } else {
                let status = resp.status();
                let content = resp.text().await.unwrap_or_default();
                Err(format!("Request failed with status {}: {}", status, content))
            }
        }
        Err(err) => Err(format!("Request failed: {}", err)),
    }
}

fn main() {
    let state = Mutex::new(AppState::default());
    state.lock().unwrap().load_cookies().unwrap_or_default();

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![login, verify_two_factor, logout, get_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
