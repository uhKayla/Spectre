<script lang="ts">
	import { onMount } from 'svelte';
	import WorldCard from '$lib/components/cards/WorldCard.svelte';
	import type { WorldSearchData } from '$lib/types/worldSearch.js';
	import { getSearchWorlds } from '$lib/utils/getSearchWorlds';

	export let searchString: string;
	let worldMap: Map<string, WorldSearchData> | null = null;

	const fetchWorlds = async (searchString: string) => {
		try {
			const worlds = await getSearchWorlds(searchString);
			const worldMap = new Map<string, WorldSearchData>();
			worlds.forEach(world => {
				worldMap.set(world.id, world);
			});
			return worldMap;
		} catch (error) {
			console.error('Error fetching worlds:', error);
			return null;
		}
	};

	const loadWorlds = async () => {
		worldMap = await fetchWorlds(searchString);
	};

	onMount(loadWorlds);

	$: {
		if (searchString !== undefined) {
			loadWorlds();
		}
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
