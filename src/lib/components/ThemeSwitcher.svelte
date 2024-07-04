<script lang="ts">
	import { onMount } from 'svelte';
	import { toggleMode, setMode, mode } from 'mode-watcher';

	let currentTheme = 'light';

	export function switchTheme(theme) {
		document.documentElement.classList.remove('light', 'dark', 'rose-theme-light', 'rose-theme-dark');
		if (theme === 'rose') {
			const isDarkMode = document.documentElement.classList.contains('dark');
			const newThemeClass = isDarkMode ? 'rose-theme-dark' : 'rose-theme-light';
			document.documentElement.classList.add(newThemeClass);
		} else {
			document.documentElement.classList.add(theme);
		}
		currentTheme = theme;
	}

	function handleModeChange(isDarkMode) {
		if (currentTheme === 'rose') {
			document.documentElement.classList.remove('rose-theme-light', 'rose-theme-dark');
			const newThemeClass = isDarkMode ? 'rose-theme-dark' : 'rose-theme-light';
			document.documentElement.classList.add(newThemeClass);
		}
	}

	onMount(() => {
		// Initialize with the current theme
		switchTheme(currentTheme);

		// Watch for mode changes
		mode.subscribe(value => handleModeChange(value === 'dark'));
	});
</script>
