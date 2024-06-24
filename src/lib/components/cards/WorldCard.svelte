<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";

	import { onMount } from 'svelte';
	import type { WorldSearchData } from '$lib/types/worldSearch';

	export let world: WorldSearchData;
</script>

<style>
    .header-background {
        background-size: cover;
        background-position: center;
        height: 200px; /* Adjust height as needed */
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden; /* Ensure the image is contained within the div */
        border-top-left-radius: 0.5rem; /* Match the card's border radius */
        border-top-right-radius: 0.5rem; /* Match the card's border radius */
    }

    .header-text {
        background-color: rgba(0, 0, 0, 0.5); /* Optional: Add background to make text readable */
        color: white; /* Text color */
        padding: 0.5rem; /* Add some padding */
        border-radius: 0.25rem; /* Optional: Add border radius */
				width: 100%;
				height: 100%;
    }
</style>

<div class="p-2">
	<Card.Root class="flex flex-col justify-center items-center h-80 w-full">
		<Card.Header class="w-full overflow-hidden p-0 h-64">
			<div class="header-background h-64" style="background-image: url({world.imageUrl});">
			</div>
		</Card.Header>
		<Card.Content class="flex flex-col justify-center items-center flex-grow p-4">
			<div class="flex text-xl">
				{world.name}
			</div>
			<div class="flex text-md text-muted-foreground">
				{world.authorName}
			</div>
			<div class="flex text-xs text-muted-foreground">
				{world.occupants} Players
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-center items-center">
			<Button>More</Button>
		</Card.Footer>
	</Card.Root>
</div>
