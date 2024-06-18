import { fetch } from '@tauri-apps/api/http';

export const loadLocation = async (locationId: string) => {
	try {
		const response = await fetch(`http://localhost:5005/worlds/${locationId}`, {
			method: 'GET',
		});
		return response.data;
	} catch (error) {
		console.error(`Error fetching location data for ${locationId}:`, error);
		throw error;
	}
};
