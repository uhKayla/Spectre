import { invoke } from '@tauri-apps/api/tauri';
import type { AvatarData } from '$lib/types/avatarSearch';

export const getOwnAvatarList = async (offset: number): Promise<AvatarData[]> => {
	try {
		console.log('getOwnAvatarList');
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/avatars?user=me&sort=updated&n=100&releaseStatus=all&order=descending`,
				method: 'GET',
				body: null
			}
		});
		const avatars: AvatarData[] = JSON.parse(response);
		console.log(avatars);
		return avatars;
	} catch (error) {
		console.error(`Error fetching own avatar list:`, error);
		throw error;
	}
};
