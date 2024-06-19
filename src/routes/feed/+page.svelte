<script lang="ts">
	import { onMount } from 'svelte';
	import { websocketEvents, initializeWebSocket } from '$lib/utils/webSocketClient';

	let events = [];

	onMount(() => {
		initializeWebSocket();

		websocketEvents.subscribe(value => {
			events = value;
		});
	});
</script>

<main>
	<h1>WebSocket Events</h1>
	<ul>
		{#each events as event, i (i)}
			<li>
				<pre>{JSON.stringify(event, null, 2)}</pre>
			</li>
		{/each}
	</ul>
</main>

<style>
    main {
        padding: 2rem;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin-bottom: 1rem;
    }
    pre {
        padding: 1rem;
				border-color: white;
				border-width: 1px;
    }
</style>
