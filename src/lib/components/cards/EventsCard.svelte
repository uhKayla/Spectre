<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";

	import { onMount } from 'svelte';
</script>


<Card.Root class="flex flex-col justify-between h-64">
	<Card.Header>
		<Card.Title>Explore Events</Card.Title>
				<Card.Description>Explore events around VRChat!</Card.Description>
	</Card.Header>
	<Card.Content class="flex justify-center items-center">
		<Button>Explore</Button>
	</Card.Content>
	<Card.Footer class="flex justify-center items-center">
	</Card.Footer>
</Card.Root>

