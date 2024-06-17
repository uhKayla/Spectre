<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";

	import { onMount } from 'svelte';

	export let friendsOnline: number = 0; // Define the prop
</script>


<Card.Root class="flex flex-col justify-between h-64">
	<Card.Header>
		<Card.Title>Friends Online</Card.Title>
<!--		<Card.Description>Current online friends count</Card.Description>-->
	</Card.Header>
	<Card.Content class="flex justify-center items-center">
		<div class="text-6xl">
			{friendsOnline}
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-center items-center">
		<Button>Friends List</Button>
	</Card.Footer>
</Card.Root>

