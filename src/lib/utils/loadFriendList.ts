import { get } from 'svelte/store';
import { friends } from '$lib/stores/friendsStore';
import { externalUserData } from '$lib/stores/externalUserStore';
import type { Friend } from '$lib/types/friend';
import type { ExternalUserData } from '$lib/types/externalUser';
import { invoke } from '@tauri-apps/api/tauri';
import { rateLimitedLoadUserData } from '$lib/utils/getUser';
import { loadInstance } from '$lib/utils/getInstance';
import { instanceDataStore } from '$lib/stores/instanceStore';
import type { InstanceData } from '$lib/types/instance';

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
		const instanceDataMap = new Map<string, InstanceData>();

		await Promise.all(friendsList.map(async friend => {
			try {
				const userData = await rateLimitedLoadUserData(friend.id);
				userDataMap.set(friend.id, userData);

				if (userData.location && userData.location !== 'private' && userData.location !== 'Private') {
					const instanceData = await loadInstance(userData.location);
					instanceDataMap.set(friend.id, instanceData);
				}
			} catch (error) {
				console.error(`Error loading user data for ${friend.id}`, error);
			}
		}));

		externalUserData.set(userDataMap);
		instanceDataStore.set(instanceDataMap);
	} catch (error) {
		console.error('Error loading friends and user data:', error);
	}
};
