<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";

	import { onMount } from 'svelte';
	import Bars from '$lib/components/content/Bars.svelte';
</script>


<Card.Root class="flex flex-col justify-between h-64">
	<Card.Header>

	</Card.Header>
	<Card.Content class="flex justify-center items-center">
		<Bars />
	</Card.Content>
	<Card.Footer class="flex justify-center items-center">

	</Card.Footer>
</Card.Root>

