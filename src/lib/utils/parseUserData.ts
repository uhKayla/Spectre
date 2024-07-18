import type { UserData } from '$lib/types/user';

export function parseUserData(responseBody: string): UserData {
	try {
		const parsedData: UserData = JSON.parse(responseBody);
		// console.log(parsedData);
		return parsedData;
	} catch (error) {
		console.error('Failed to parse user data:', error);
		throw new Error('Invalid user data format');
	}
}
