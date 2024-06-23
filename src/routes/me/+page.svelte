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

<main class="">
	<Card.Root class="w-[700px] p-4">
		<Card.Content>
			<Me />
		</Card.Content>
	</Card.Root>

</main>