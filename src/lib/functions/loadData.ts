// Stores
import { friends } from '$lib/stores/friendsStore';
import { externalUserData } from '$lib/stores/externalUserStore';
import { instanceDataStore } from '$lib/stores/instanceStore';
import { user } from '$lib/stores/user';

// Types
import type { Friend } from '$lib/types/friend';
import type { ExternalUserData } from '$lib/types/externalUser';
import type { InstanceData } from '$lib/types/instance';
import type { UserData } from '$lib/types/user';

// Functions
import { loadFriendsList } from '$lib/utils/getFriends';
import { rateLimitedLoadUserData } from '$lib/utils/getUser';
import { loadInstance } from '$lib/utils/getInstance';
import { getCurrentUser } from '$lib/utils/getCurrentUser';
import { get } from 'svelte/store';

// Load all data needed at once
export const loadData = async () => {
	try
	{
		// get and set the current user data again
		// user.set(await getCurrentUser());

		// Initial load friends list
		const friendsList = await loadFriendsList();
		friends.set(new Map(friendsList.map(friend => [friend.id, friend])));

		// Load friends user data and their instances
		const userDataMap = new Map<string, ExternalUserData>();
		const instanceDataMap = new Map<string, InstanceData>();

		await Promise.all(friendsList.map(async friend => {
			try {
				const userData = await rateLimitedLoadUserData(friend.id);
				userDataMap.set(friend.id, userData);

				if (userData.location && userData.location !== 'private' && userData.location !== 'Private' && userData.location !== 'offline') {
					const instanceData = await loadInstance(userData.location);
					instanceDataMap.set(friend.id, instanceData);
				}
			} catch (error) {
				console.error(`Error loading user data for ${friend.id}`, error);
			}
		}));

		externalUserData.set(userDataMap);
		instanceDataStore.set(instanceDataMap);
	}
	catch (error)
	{
		console.error(error);
	}
};

// entrypoint reload data forced or not
export const reloadData = async (forceReload: boolean) => {
	const friendsStore = get(friends);
	const externalUserDataStore = get(externalUserData);
	const instanceStore = get(instanceDataStore);

	if (forceReload || friendsStore.size === 0 || externalUserDataStore.size === 0 || instanceStore.size === 0) {
		console.log("Reloading data...");
		await loadData();
	}
};
