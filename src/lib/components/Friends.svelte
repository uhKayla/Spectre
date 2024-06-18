<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";
	import type { Friend } from "$lib/types/friend"; // Use type-only import
	import type { World } from "$lib/types/world"; // Use type-only import
	import { friends } from "$lib/stores/friendsStore";
	import { locations } from "$lib/stores/locationStore";
	import { onMount } from "svelte";
	import { loadFriends } from "$lib/api/friendsList";
	import { loadLocation } from "$lib/api/getLocation";
	import { Card } from '$lib/components/ui/card';
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";

	const getStatusClass = (status: string) => {
		switch (status.toLowerCase()) {
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
	};

	const initializeData = async () => {
		try {
			const friendsData: Friend[] = await loadFriends();
			const locationData: { [locationId: string]: World } = {};

			for (const friend of friendsData) {
				try {
					const location = await loadLocation(friend.location);
					locationData[friend.location] = <World>location;
				} catch (error) {
					console.error(`Error fetching location for ${friend.location}`, error);
				}
			}

			locations.set(locationData);
			friends.set(friendsData); // Set the friends data to the store
		} catch (error) {
			console.error('Error initializing data:', error);
		}
	};

	onMount(initializeData);
</script>

<style>
    .status-circle {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
    }

    .status-join-me {
        background-color: blue;
    }

    .status-active {
        background-color: green;
    }

    .status-ask-me {
        background-color: orange;
    }

    .status-busy {
        background-color: red;
    }
</style>

<Card>
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
				<Table.Row class="">
					<!--Status-->
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Table.Cell class="justify-center">
								<span class={getStatusClass(friend.status)}></span>
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
<!--											<CalendarDays class="mr-2 h-4 w-4 opacity-70" />-->
<!--											<span class="text-xs text-muted-foreground">-->
<!--												Joined September 2022-->
<!--											</span>-->
										</div>
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					</Table.Cell>

					<!--Location-->
					<Table.Cell>{$locations[friend.location]?.name || "Loading..."}</Table.Cell>

					<!--JoinButton-->
					<Table.Cell class="text-right">{friend.status}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Card>
