<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";

	import { onMount } from 'svelte';
	import Bars from '$lib/components/content/Bars.svelte';
</script>


<Card.Root class="flex flex-col h-64 justify-center items-center object-center">
	<Card.Content class="flex justify-center items-center object-center p-6">
		<Bars />
	</Card.Content>
</Card.Root>

