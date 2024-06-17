import { locations } from '$lib/stores/locationStore';
import { fetch } from '@tauri-apps/api/http';

export const loadLocationFiles = async (friends) => {
	const locationData = {};
	for (const friend of friends) {
		try {
			const locationResponse = await fetch(`http://localhost:5005/world/${friend.location}`, {
				method: 'GET',
			});
			locationData[friend.location] = locationResponse.data;
		} catch (error) {
			console.error(`Error fetching location data for ${friend.location}:`, error);
		}
	}
	locations.set(locationData);
};
