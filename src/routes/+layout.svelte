<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/components/Header.svelte"
</script>
<style>

</style>
<ModeWatcher />
<Header />
<slot />