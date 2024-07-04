import { mode } from 'mode-watcher';
import { saveSetting, getSetting } from '$lib/tauri/store';

let currentTheme: string = 'default';

export async function switchTheme(theme: string) {
	const isDarkMode = document.documentElement.classList.contains('dark');
	document.documentElement.classList.remove('rose-light', 'rose-dark', 'blue-light', 'blue-dark', 'green-light', 'green-dark', 'orange-light', 'orange-dark', 'violet-light', 'violet-dark');

	switch (theme) {
		case 'rose':
			document.documentElement.classList.add(isDarkMode ? 'rose-dark' : 'rose-light');
			break;
		case 'blue':
			document.documentElement.classList.add(isDarkMode ? 'blue-dark' : 'blue-light');
			break;
		case 'green':
			document.documentElement.classList.add(isDarkMode ? 'green-dark' : 'green-light');
			break;
		case 'orange':
			document.documentElement.classList.add(isDarkMode ? 'orange-dark' : 'orange-light');
			break;
		case 'violet':
			document.documentElement.classList.add(isDarkMode ? 'violet-dark' : 'violet-light');
			break;
	}

	currentTheme = theme;
	await saveSetting('theme', theme);
}

export async function handleModeChange(isDarkMode: boolean) {
	document.documentElement.classList.remove('rose-light', 'rose-dark', 'blue-light', 'blue-dark', 'green-light', 'green-dark', 'orange-light', 'orange-dark', 'violet-light', 'violet-dark');

	switch (currentTheme) {
		case 'rose':
			document.documentElement.classList.add(isDarkMode ? 'rose-dark' : 'rose-light');
			break;
		case 'blue':
			document.documentElement.classList.add(isDarkMode ? 'blue-dark' : 'blue-light');
			break;
		case 'green':
			document.documentElement.classList.add(isDarkMode ? 'green-dark' : 'green-light');
			break;
		case 'orange':
			document.documentElement.classList.add(isDarkMode ? 'orange-dark' : 'orange-light');
			break;
		case 'violet':
			document.documentElement.classList.add(isDarkMode ? 'violet-dark' : 'violet-light');
			break;
	}

	await saveSetting('darkMode', isDarkMode ? 'dark' : 'light');
}

mode.subscribe(async (value) => {
	await handleModeChange(value === 'dark');
});

export async function loadSettings() {
	const savedTheme = await getSetting('theme');
	const savedMode = await getSetting('darkMode');

	if (savedTheme) {
		currentTheme = savedTheme;
		switchTheme(savedTheme);
	}

	if (savedMode === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}
