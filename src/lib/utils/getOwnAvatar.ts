import { invoke } from '@tauri-apps/api/tauri';
import type { OwnAvatarData } from '$lib/types/ownAvatar';
import { ownAvatar } from '$lib/stores/ownAvatarStore';

// export let userId: string;

export const loadOwnAvatar = async (userId: string): Promise<OwnAvatarData> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/users/${userId}/avatar`,
				method: 'GET',
				body: null
			}
		});
		console.log('Response:', response);
		const data = JSON.parse(response) as OwnAvatarData;
		ownAvatar.set(data); // Save the data to the store
		return data;
	} catch (error) {
		console.error('Error fetching own avatar:', error);
		throw error;
	}
};
