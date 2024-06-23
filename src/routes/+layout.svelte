<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/components/Header.svelte"
	import { Toaster } from "$lib/components/ui/sonner";

</script>
<style>

</style>
<ModeWatcher />
<Header />
<Toaster />
<slot />