<script lang="ts">
	import { worldSearchStore } from '$lib/stores/worldSearchStore';
	import type { WorldSearchData } from '$lib/types/worldSearch.js';
	import { onMount, afterUpdate } from 'svelte';
	import { get } from 'svelte/store';
	import { getActiveWorlds } from '$lib/utils/getActiveWorlds';
	import WorldCard from '$lib/components/cards/WorldCard.svelte';

	export let page: number;
	let worldMap: Map<string, WorldSearchData> | null = null;

	const getPageOffset = (page: number) => {
		return page * 18;
	};

	const fetchAndStoreWorlds = async (offset: number) => {
		try {
			const worlds = await getActiveWorlds(offset);
			const worldMap = new Map<string, WorldSearchData>();
			worlds.forEach(world => {
				worldMap.set(world.id, world);
			});
			worldSearchStore.set(worldMap);
		} catch (error) {
			console.error('Error fetching and storing worlds:', error);
		}
	};

	const loadWorlds = async () => {
		const offset = getPageOffset(page);
		await fetchAndStoreWorlds(offset);
		worldMap = get(worldSearchStore);
	};

	onMount(async () => {
		worldMap = get(worldSearchStore);
		if (!worldMap || worldMap.size < 1) {
			await loadWorlds();
		}
	});

	$: if (page !== undefined) {
		loadWorlds();
	}
</script>

<div>
	<div class="grid grid-cols-3 p-4">
	{#if worldMap && worldMap.size > 0}
		{#each Array.from(worldMap.values()) as world (world.id)}
			<WorldCard world={world} />
		{/each}
	{:else}
		<p>No worlds available.</p>
	{/if}
	</div>
</div>
