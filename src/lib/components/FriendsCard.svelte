<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";

	import { onMount } from 'svelte';

	export let friendsOnline: number = 0; // Define the prop
</script>


<Card.Root class="">
	<Card.Header>
		<Card.Title>Friends Online</Card.Title>
		<Card.Description>Current online friends count</Card.Description>
	</Card.Header>
	<Card.Content class="flex justify-center items-center">
		<div class="text-6xl">
			{friendsOnline}
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button>Friends List</Button>
	</Card.Footer>
</Card.Root>

