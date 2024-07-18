import { invoke } from '@tauri-apps/api/tauri';
import type { ExternalUserData } from '$lib/types/externalUser';
import { externalUserData } from '$lib/stores/externalUserStore';
import pLimit from 'p-limit';

const limit = pLimit(30); // Limit to 30 requests per second

export const loadUser = async (userId: string): Promise<ExternalUserData> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/users/${userId}`,
				method: 'GET',
				body: null
			}
		});
		// console.log(response);
		return JSON.parse(response);
	} catch (error) {
		console.error('Error user:', error);
		throw error;
	}
};

export const rateLimitedLoadUserData = (userId: string): Promise<ExternalUserData> => limit(async () => {
	const userData = await loadUser(userId);
	externalUserData.update(map => {
		const updatedMap = new Map(map);
		updatedMap.set(userId, userData);
		return updatedMap;
	});
	return userData;
});
