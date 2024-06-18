import { fetch } from '@tauri-apps/api/http';
import type { Friend } from '$lib/types/friend';

export const loadFriends = async (): Promise<Friend[]> => {
	try {
		const response = await fetch('http://localhost:5005/auth/user/friends', {
			method: 'GET',
		});
		return response.data as Friend[];
	} catch (error) {
		console.error('Error fetching friends:', error);
		throw error;
	}
};
