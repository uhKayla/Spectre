import { invoke } from '@tauri-apps/api/tauri';
import type { GroupData } from '$lib/types/group';

export const loadGroup = async (groupId: string): Promise<GroupData> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/groups/${groupId}`,
				method: 'GET',
				body: null
			}
		});
		const group: GroupData = JSON.parse(response);
		console.log(group);
		return group;
	} catch (error) {
		console.error(`Error fetching location data for ${groupId}:`, error);
		throw error;
	}
};
