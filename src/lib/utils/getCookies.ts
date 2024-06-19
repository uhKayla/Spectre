import { readTextFile } from '@tauri-apps/api/fs';
import { appDir } from '@tauri-apps/api/path';

export const readCookies = async (): Promise<string> => {
	try {
		const cookiesPath = await appDir() + 'cookies.json';
		const cookies = await readTextFile(cookiesPath);
		return cookies;
	} catch (error) {
		console.error('Failed to read cookies:', error);
		throw error;
	}
};
