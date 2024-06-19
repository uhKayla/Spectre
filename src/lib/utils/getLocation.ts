import { invoke } from '@tauri-apps/api/tauri';
import type { World } from '$lib/types/world';

export const loadLocation = async (locationId: string): Promise<World> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/worlds/${locationId}`,
				method: 'GET',
				body: null
			}
		});
		const location: World = JSON.parse(response);
		return location;
	} catch (error) {
		console.error(`Error fetching location data for ${locationId}:`, error);
		throw error;
	}
};
