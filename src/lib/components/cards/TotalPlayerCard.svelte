<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";

	import { onMount } from 'svelte';

	export let totalOnline: number = 0; // Define the prop
</script>


<Card.Root class="flex flex-col justify-between h-64">
	<Card.Header>
		<Card.Title>Total Online Players</Card.Title>
		<Card.Description>Current amount of players exploring VRChat</Card.Description>
	</Card.Header>
	<Card.Content class="flex justify-center text-center h-32">
		<div class="text-6xl">
			{totalOnline}
		</div>
	</Card.Content>
</Card.Root>

