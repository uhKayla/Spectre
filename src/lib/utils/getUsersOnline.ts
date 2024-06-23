import { invoke } from '@tauri-apps/api/tauri';

export const getUsersOnline = async (): Promise<number> => {
	try {
		const response = await invoke<number>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/visits`,
				method: 'GET',
				body: null
			}
		});
		console.log(`Users Online: ${response}`);
		return response;
	} catch (error) {
		console.error(`Error fetching online users:`, error);
		throw error;
	}
};
