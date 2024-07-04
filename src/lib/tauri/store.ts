import { Store } from "tauri-plugin-store-api";

const store = new Store(".settings.dat");

export async function saveSetting(key: string, value: string) {
	await store.set(key, value);
	await store.save();
}

export async function getSetting(key: string): Promise<string | null> {
	const value = await store.get<string>(key);
	return value || null;
}
