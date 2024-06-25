import { invoke } from '@tauri-apps/api/tauri';
import type { WorldSearchData } from '$lib/types/worldSearch';

export const getSearchWorlds = async (search: string): Promise<WorldSearchData[]> => {
	try {
		console.log('getSearchWorlds');
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/worlds?featured=false&sort=popularity&order=descending&search=${search}&n=72`,
				method: 'GET',
				body: null
			}
		});
		const location: WorldSearchData[] = JSON.parse(response);
		console.log(location);
		return location;
	} catch (error) {
		console.error(`Error fetching searched worlds:`, error);
		throw error;
	}
};
