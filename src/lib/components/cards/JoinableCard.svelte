<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";

	import { onMount } from 'svelte';

	export let joinableOnline: number = 0; // Define the prop
</script>


<Card.Root class="flex flex-col justify-between h-64">
	<Card.Header>
		<Card.Title>Joinable Friends</Card.Title>
<!--		<Card.Description>Current amount of friends in joinable instances</Card.Description>-->
	</Card.Header>
	<Card.Content class="flex justify-center items-center">
		<div class="text-6xl">
			{joinableOnline}
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-center items-center">
		<Button href="/friends">Friends List</Button>
	</Card.Footer>
</Card.Root>

