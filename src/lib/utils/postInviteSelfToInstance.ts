import { invoke } from '@tauri-apps/api/tauri';
import type { InviteResponse } from '$lib/types/inviteResponse';

export const sendInviteToMyself = async (worldId: string, instanceId: string): Promise<InviteResponse> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://api.vrchat.cloud/api/1/invite/myself/to/${worldId}:${instanceId}`,
				method: 'POST',
				body: null
			}
		});
		const group: InviteResponse = JSON.parse(response);
		console.log(group);
		return group;
	} catch (error) {
		console.error(`Error sending invite to instance ${instanceId}:`, error);
		throw error;
	}
};
