import { invoke } from '@tauri-apps/api';

async function logout(response: unknown) {
	try {
		const result = await invoke('logout');
		response = result;
		console.log(result);
	} catch (error) {
		response = error;
		console.error(error);
	}
}