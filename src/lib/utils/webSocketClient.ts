import { invoke } from '@tauri-apps/api/tauri';
import { writable } from 'svelte/store';

export const websocketEvents = writable<any[]>([]);

export const initializeWebSocket = async () => {
	try {
		const cookies = await invoke<string>('get_cookies');
		// const cookieValue = JSON.parse(cookies);
		const websocketUrl = `wss://pipeline.vrchat.cloud/?authToken=${cookies}`;

		const ws = new WebSocket(websocketUrl);

		ws.onopen = () => {
			console.log('WebSocket connection opened.');
		};

		ws.onmessage = (event) => {
			const eventData = JSON.parse(event.data);
			console.log('WebSocket message received:', eventData);
			websocketEvents.update(events => [...events, eventData]);
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
	} catch (error) {
		console.error('Failed to initialize WebSocket:', error);
	}
};
