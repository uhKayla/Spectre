import { invoke } from '@tauri-apps/api/tauri';
import type { UserData } from '$lib/types/user';

export const getCurrentUser = async (): Promise<UserData> => {
	try {
		const response = await invoke<string>('make_request', {
			params: {
				url: `https://vrchat.com/api/1/auth/user`,
				method: 'GET',
				body: null
			}
		});
		const user: UserData = JSON.parse(response);
		console.log(user);
		return user;
	} catch (error) {
		console.error(`Error fetching user data:`, error);
		throw error;
	}
};
