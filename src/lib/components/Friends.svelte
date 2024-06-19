<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";
	import { friends } from "$lib/stores/friendsStore";
	import { externalUserData } from "$lib/stores/externalUserStore";
	import { instanceDataStore } from '$lib/stores/instanceStore';
	import { onMount } from "svelte";
	import { loadFriendsAndUserData } from "$lib/utils/loadFriendList";
	import { Card } from '$lib/components/ui/card';
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { get } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';

	const getStatusClass = (state: string, status: string) => {
		switch (state?.toLowerCase()) {
			case "online":
				switch (status?.toLowerCase()) {
					case "join me":
						return "status-circle status-join-me";
					case "active":
						return "status-circle status-active";
					case "ask me":
						return "status-circle status-ask-me";
					case "busy":
						return "status-circle status-busy";
					default:
						return "";
				}
			case "active":
				return "status-circle status-website";
			default:
				return "";
		}
	};

	const initializeData = async () => {
		await loadFriendsAndUserData();
		console.log('Friends:', $friends);
		console.log('External User Data:', $externalUserData);
		console.log('Instance Data:', $instanceDataStore);
	};

	onMount(initializeData);

	$: sortedFriends = Array.from($friends.values()).map(friend => {
		const userData = $externalUserData.get(friend.id);
		const instanceData = $instanceDataStore.get(friend.id);
		const state = userData?.state || 'offline';
		const status = state === 'online' ? userData?.status : (state === 'active' ? 'On Website' : 'Offline');
		const locationName = state === 'offline' ? 'Offline' : (state === 'active' ? 'On Website' : (instanceData?.world.name || (friend.location === 'private' ? 'Private' : 'Loading...')));
		const locationCount = instanceData?.userCount;
		const locationCapacity = instanceData?.capacity;

		return {
			...friend,
			state,
			status,
			locationName,
			locationCount,
			locationCapacity
		};
	}).sort((a, b) => {
		const stateOrder = {
			'online:join me': 1,
			'online:active': 2,
			'online:ask me': 3,
			'online:busy': 4,
			'active': 5,
			'offline': 6
		};

		const aKey = `${a.state}:${a.status}`.toLowerCase();
		const bKey = `${b.state}:${b.status}`.toLowerCase();

		return (stateOrder[aKey] || stateOrder[a.state]) - (stateOrder[bKey] || stateOrder[b.state]);
	});
</script>

<style>
    .status-circle {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
    }

    .status-join-me {
        background-color: deepskyblue;
    }

    .status-active {
        background-color: green;
    }

    .status-ask-me {
        background-color: orange;
    }

    .status-busy {
        background-color: darkred;
    }

    .status-website {
        background-color: gray;
    }
</style>

<Card>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Status</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Location</Table.Head>
				<Table.Head class="text-right">Join</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each sortedFriends as friend, i (i)}
				<Table.Row class="">
					<!--Status-->
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Table.Cell class="justify-center">
								<span class={getStatusClass(friend.state, friend.status)}></span>
							</Table.Cell>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>{friend.status}</p>
						</Tooltip.Content>
					</Tooltip.Root>

					<!--Name-->
					<Table.Cell>
						<HoverCard.Root>
							<HoverCard.Trigger>
								{friend.displayName}
							</HoverCard.Trigger>
							<HoverCard.Content class="w-80">
								<div class="flex justify-between space-x-4">
									<Avatar.Root>
										{#if friend.userIcon == null}
											<Avatar.Image src={friend.currentAvatarThumbnailImageUrl} />
										{:else}
											<Avatar.Image src={friend.userIcon} />
										{/if}
										<Avatar.Fallback>SK</Avatar.Fallback>
									</Avatar.Root>
									<div class="space-y-1">
										<h4 class="text-sm font-semibold">{friend.displayName}</h4>
										<p class="text-sm whitespace-pre-line">{friend.bio}</p>
										<div class="flex items-center pt-2">
										</div>
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					</Table.Cell>

					<!--Location-->
					<Table.Cell>
						{friend.locationName}
						{#if friend.locationName !== "Private" && friend.locationName !== "On Website"}
							({friend.locationCount} / {friend.locationCapacity} )
						{/if}
					</Table.Cell>

					<!--JoinButton-->
					<Table.Cell class="text-right">
						<Button>View Details</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Card>
