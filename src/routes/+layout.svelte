<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/components/Header.svelte";
	import { Toaster } from "$lib/components/ui/sonner";
	import { loadSettings } from '$lib/utils/themeSwitcher';

	import { onMount } from 'svelte';

	onMount(() => {
		loadSettings();
	});
</script>

<ModeWatcher />
<Header />
<Toaster />
<slot />
