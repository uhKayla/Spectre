<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";

	import { onMount } from 'svelte';
</script>


<Card.Root class="flex flex-col justify-center items-center h-64">
	<Card.Content class="flex justify-center items-center">
		<div class="flex text-2xl">
			Get out there and explore!
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-center items-center">
		<Button href="/worlds">Discover Worlds</Button>
	</Card.Footer>
</Card.Root>

