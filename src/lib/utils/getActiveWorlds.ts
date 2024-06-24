import { invoke } from '@tauri-apps/api/tauri';
import type { WorldSearchData } from '$lib/types/worldSearch';

export const getActiveWorlds = async (offset: number): Promise<WorldSearchData[]> => {
	try {
		console.log('getActiveWorlds');
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/worlds/active?featured=false&sort=heat&order=ascending&releaseStatus=public&offset=${offset}&n=18`,
				method: 'GET',
				body: null
			}
		});
		const location: WorldSearchData[] = JSON.parse(response);
		console.log(location);
		return location;
	} catch (error) {
		console.error(`Error fetching active worlds:`, error);
		throw error;
	}
};
