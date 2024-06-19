import { invoke } from '@tauri-apps/api/tauri';
import type { InstanceData } from '$lib/types/instance';

export const loadInstance = async (locationId: string): Promise<InstanceData> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/instances/${locationId}`,
				method: 'GET',
				body: null
			}
		});
		const location: InstanceData = JSON.parse(response);
		return location;
	} catch (error) {
		console.error(`Error fetching location data for ${locationId}:`, error);
		throw error;
	}
};
