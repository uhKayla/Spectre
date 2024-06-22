<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";
	import { friends } from "$lib/stores/friendsStore";
	import { externalUserData } from "$lib/stores/externalUserStore";
	import { instanceDataStore } from '$lib/stores/instanceStore';
	import { onMount } from "svelte";
	import { loadFriendsAndUserData } from "$lib/utils/loadFriendList";
	import { Card } from '$lib/components/ui/card';
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js"
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { get } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import { LucideRefreshCw, User } from 'lucide-svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import UserInfo from '$lib/components/UserInfo.svelte'
	import Instance from '$lib/components/Instance.svelte';

	let loading = !get(friends).size || !get(externalUserData).size || !get(instanceDataStore).size;

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

	const initializeData = async (forceReload = false) => {
		const friendsStore = get(friends);
		const externalUserDataStore = get(externalUserData);
		const instanceStore = get(instanceDataStore);

		if (forceReload || friendsStore.size === 0 || externalUserDataStore.size === 0 || instanceStore.size === 0) {
			loading = true;
			await loadFriendsAndUserData();
			loading = false;
		}
	};

	const handleRefresh = () => {
		initializeData(true);
	};

	onMount(() => initializeData());

	$: sortedFriends = Array.from($friends.values()).map(friend => {
		const userData = $externalUserData.get(friend.id);
		const instanceData = $instanceDataStore.get(friend.id);
		const state = userData?.state || 'offline';
		const status = state === 'online' ? userData?.status : (state === 'active' ? 'On Website' : 'Offline');
		const locationName = state === 'offline' ? 'Offline' : (state === 'active' ? 'On Website' : (instanceData?.world.name || (friend.location === 'private' ? 'Private' : 'Loading...')));
		const locationCount = instanceData?.userCount;
		const locationCapacity = instanceData?.capacity;
		const locationData = instanceData?.world;

		return {
			...friend,
			state,
			status,
			locationName,
			locationCount,
			locationCapacity,
			locationData
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

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .rotating {
        animation: rotate 1s linear infinite;
    }
</style>

<div class="grid grid-cols-2">
	<div class="text-3xl">Friends</div>
	<div class="justify-end content-end items-end text-end">
		<Button variant="outline" on:click={handleRefresh} size="icon">
			{#if loading}
				<LucideRefreshCw class="h-[1.2rem] w-[1.2rem] transition-all rotating" />
			{:else}
				<LucideRefreshCw class="h-[1.2rem] w-[1.2rem] transition-all rotating" />
			{/if}
		</Button>
	</div>
</div>
<br>

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
			{#if loading}
				{#each Array(5) as _, i}
					<Table.Row class="">
						<Table.Cell class="justify-center">
							<Skeleton class="h-6 w-[250px]"/>
						</Table.Cell>
						<Table.Cell>
							<Skeleton class="h-6 w-[250px]"/>
						</Table.Cell>
						<Table.Cell>
							<Skeleton class="h-6 w-[250px]"/>
						</Table.Cell>
						<Table.Cell class="text-right">
							<Skeleton class="h-6 w-[250px]"/>
						</Table.Cell>
					</Table.Row>
				{/each}
			{:else}
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
							<Dialog.Root>
								<Dialog.Trigger>
									<HoverCard.Root>
										<HoverCard.Trigger>
											{friend.displayName}
										</HoverCard.Trigger>
										<HoverCard.Content class="w-80">
											<div class="flex space-x-4">
												<Avatar.Root>
													{#if friend.userIcon === null || friend.userIcon === ""}
														<Avatar.Image src={friend.currentAvatarThumbnailImageUrl} />
													{:else}
														<Avatar.Image src={friend.userIcon} />
													{/if}
													<Avatar.Fallback>SK</Avatar.Fallback>
												</Avatar.Root>
												<div class="space-y-1">
													<h4 class="text-sm font-semibold">{friend.displayName}</h4>
													<p class="text-sm whitespace-pre-line">{friend.statusDescription}</p>
													<div class="text-xs text-muted-foreground flex items-center pt-2">{friend.status}</div>
													<div class="text-xs text-muted-foreground flex items-center pt-2">{friend.bio}</div>
												</div>
											</div>
										</HoverCard.Content>
									</HoverCard.Root>
							</Dialog.Trigger>
							<Dialog.Content>
								<UserInfo userId={friend.id} />
							</Dialog.Content>
							</Dialog.Root>
						</Table.Cell>

						<!--Location-->
						<Table.Cell>
							{#if friend?.locationName !== "Private" && friend?.locationName !== "On Website"}
								<Dialog.Root>
									<Dialog.Trigger>
										<HoverCard.Root>
											<HoverCard.Trigger>
												{friend?.locationName} ({friend?.locationCount} / {friend?.locationData?.recommendedCapacity}) [{friend?.locationCapacity}]
											</HoverCard.Trigger>
											<HoverCard.Content class="w-80">
												<div class="flex space-x-4">
													<Avatar.Root>
															<Avatar.Image src={friend?.locationData?.thumbnailImageUrl} />
														<Avatar.Fallback>SK</Avatar.Fallback>
													</Avatar.Root>
													<div class="space-y-1">
														<h4 class="text-sm font-semibold">{friend?.locationName}</h4>
														<p class="text-xs whitespace-pre-line">{friend?.locationData?.description}</p>
														<div class="text-xs text-muted-foreground flex items-center pt-2">{friend?.locationCount} / {friend?.locationData?.recommendedCapacity} ({friend?.locationCapacity})</div>
													</div>
												</div>
											</HoverCard.Content>
										</HoverCard.Root>
									</Dialog.Trigger>
									<Dialog.Content>
										<Instance userId="{friend.id}" />
									</Dialog.Content>
								</Dialog.Root>
							{:else}
								{friend.locationName}
							{/if}
						</Table.Cell>

						<!--JoinButton-->
						<Table.Cell class="text-right">
							{#if friend.locationName !== "Private" && friend.locationName !== "On Website" }
								<Dialog.Root>
									<Dialog.Trigger>
										<Button>Details</Button>
									</Dialog.Trigger>
									<Dialog.Content>
										<Instance userId="{friend.id}" />
									</Dialog.Content>
								</Dialog.Root>
							{:else}
								<Button disabled variant="outline" class="text-muted-foreground">Details</Button>
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</Card>
