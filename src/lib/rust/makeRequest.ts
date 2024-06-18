import { invoke } from '@tauri-apps/api/tauri';

export async function makeRequest(url: string, method: string, body = null) {
	try {
		const response = await invoke('make_request', {
			params:{
				url: url,
				method: method,
				body: body
			}
		});
		console.log('Response:', response);
		return JSON.parse(<string>response);
	} catch (error) {
		console.error('Error making request:', error);
		throw error;
	}
}