import { invoke } from '@tauri-apps/api/tauri';

export async function makeRequest() {
	try {
		const response = await invoke('get_request');
		console.log('Response:', response);
		return JSON.parse(<string>response);
	} catch (error) {
		console.error('Error making request:', error);
		throw error;
	}
}