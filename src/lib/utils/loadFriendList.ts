import { get } from 'svelte/store';
import { friends } from '$lib/stores/friendsStore';
import { externalUserData } from '$lib/stores/externalUserStore';
import type { Friend } from '$lib/types/friend';
import type { ExternalUserData } from '$lib/types/externalUser';
import { invoke } from '@tauri-apps/api/tauri';
import { rateLimitedLoadUserData } from '$lib/utils/getUser';

const loadFriendsList = async (): Promise<Friend[]> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: 'https://api.vrchat.cloud/api/1/auth/user/friends?offline=false',
				method: 'GET',
				body: null
			}
		});
		return JSON.parse(response) as Friend[];
	} catch (error) {
		console.error('Error loading friends list:', error);
		throw error;
	}
};

export const loadFriendsAndUserData = async () => {
	try {
		const friendsList = await loadFriendsList();
		friends.set(new Map(friendsList.map(friend => [friend.id, friend])));

		const userDataMap = new Map<string, ExternalUserData>();

		await Promise.all(friendsList.map(async friend => {
			try {
				const userData = await rateLimitedLoadUserData(friend.id);
				userDataMap.set(friend.id, userData);
			} catch (error) {
				console.error(`Error loading user data for ${friend.id}`, error);
			}
		}));

		externalUserData.set(userDataMap);
	} catch (error) {
		console.error('Error loading friends and user data:', error);
	}
};
