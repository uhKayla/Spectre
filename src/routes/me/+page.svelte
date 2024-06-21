<script>
	import Me from '$lib/components/Me.svelte';
	import * as Card from "$lib/components/ui/card";
</script>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>

<div class="p-1">
	<Card.Root class="w-[500px] p-4">
		<Card.Content>
			<Me />
		</Card.Content>
	</Card.Root>

</div>