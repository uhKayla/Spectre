import { friends } from '$lib/stores/friendsStore';
import { fetch } from '@tauri-apps/api/http';

export const loadFriends = async () => {
	try {
		const response = await fetch('http://localhost:5005/auth/user/friends', {
			method: 'GET',
		});
		const data = response.data;
		friends.set(data);
		return data;
	} catch (error) {
		console.error('Error fetching friends:', error);
		throw error;
	}
};