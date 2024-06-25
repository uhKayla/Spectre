import { invoke } from '@tauri-apps/api/tauri';

export const getApiTime = async (): Promise<string> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/time`,
				method: 'GET',
				body: null
			}
		});
		console.log(`API Time: ${response}`);
		response.replace(/['"]+/g, '');
		return response;
	} catch (error) {
		console.error(`Error fetching API Time:`, error);
		throw error;
	}
};
