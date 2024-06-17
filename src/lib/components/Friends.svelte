<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";
	import { friends } from "$lib/stores/friendsStore";
	import { locations } from "$lib/stores/locationStore";
	import { onMount } from "svelte";
	import { loadFriends } from "$lib/api/friendsList";
	import { loadLocationFiles } from "$lib/api/getLocation";

	const initializeData = async () => {
		try {
			const friendsData = await loadFriends();
			await loadLocationFiles(friendsData);
		} catch (error) {
			console.error('Error initializing data:', error);
		}
	};

	onMount(initializeData);
</script>

<Table.Root>
	<!--	<Table.Caption>A list of your recent statuss.</Table.Caption>-->
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Status</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Location</Table.Head>
			<Table.Head class="text-right">Join</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each $friends as friend, i (i)}
			<Table.Row>
				<Table.Cell class="font-medium">{friend.status}</Table.Cell>
				<Table.Cell>{friend.displayName}</Table.Cell>
				<Table.Cell>{$locations[friend.location]?.name || "Loading..."}</Table.Cell>
				<Table.Cell class="text-right">{friend.status}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
