import { invoke } from '@tauri-apps/api/tauri';
import type { Friend } from '$lib/types/friend';

export const loadFriendsList = async (): Promise<Friend[]> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: 'https://api.vrchat.cloud/api/1/auth/user/friends?offline=false',
				method: 'GET',
				body: null
			}
		});
		// console.log('Response:', response);
		return JSON.parse(response) as Friend[];
	} catch (error) {
		console.error('Error fetching friends:', error);
		throw error;
	}
};
