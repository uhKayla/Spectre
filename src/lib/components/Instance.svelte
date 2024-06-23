<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from "$lib/components/ui/card";
	import * as Avatar from "$lib/components/ui/avatar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	import type { ExternalUserData } from '$lib/types/externalUser';
	import type { InstanceData } from '$lib/types/instance';
	import type { Friend } from '$lib/types/friend';

	import { open } from '@tauri-apps/api/shell';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	import { externalUserData } from '$lib/stores/externalUserStore';
	import { instanceDataStore } from '$lib/stores/instanceStore';
	import { loadUser } from '$lib/utils/getUser';
	import { getFriendsByInstanceId } from '$lib/utils/getFriendsByInstanceId';
	import type { GroupData } from '$lib/types/group';
	import { loadGroup } from '$lib/utils/getGroupById';
	import { sendInviteToMyself } from '$lib/utils/postInviteSelfToInstance';

	export let userId: string;
	let instance: InstanceData | undefined;
	let instanceOwnerUser: ExternalUserData | undefined;
	let instanceOwnerGroup: GroupData | undefined;
	let friendsInInstance: Friend[] = [];

	const openUrl = (link: string) => {
		open(link)
	}

	onMount(async () => {
		const userMap = get(instanceDataStore);
		instance = userMap.get(userId);

		if (instance?.ownerId.startsWith("usr")) {
			instanceOwnerUser = await loadUser(instance?.ownerId)
		} else if (instance?.ownerId.startsWith("grp")) {
			instanceOwnerGroup = await loadGroup(instance?.ownerId)
		}

		if (instance?.instanceId) {
			friendsInInstance = getFriendsByInstanceId(instance.instanceId);
		}
	});
</script>
<div class="mt-5">
	<div class="grid gap-8">

		<!--Section-->
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src={instance?.world.thumbnailImageUrl} alt="World Thumbnail" />
				<Avatar.Fallback>{instance?.world?.name?.charAt(0).toUpperCase() || 'NA'}</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">
					{instance?.world.name || 'World Name'}
				</p>
				<p class="text-sm text-muted-foreground">({instance?.userCount} / {instance?.recommendedCapacity}) [{instance?.capacity}]</p>
			</div>
			<div class="ml-auto">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button class="ml-auto font-medium" variant="outline" size="icon">...</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Options</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item on:click={openUrl(`vrchat://launch?ref=vrchat.com&id=${instance?.worldId}:${instance?.instanceId}`)}>Join Instance</DropdownMenu.Item>
							<DropdownMenu.Item on:click={sendInviteToMyself(instance?.worldId, instance?.instanceId)}>Invite Me</DropdownMenu.Item>
							<DropdownMenu.Item on:click={openUrl(`https://vrchat.com/home/launch?worldId=${instance?.worldId}&instanceId=${instance?.instanceId}`)}>Open Instance</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<!--Section-->
		<div class="flex flex-col space-y-2">
			<ScrollArea class="h-20 rounded-md border p-2 " orientation="both">
				<p class="text-sm text-muted-foreground">{instance?.world.description}</p>
			</ScrollArea>
		</div>
		<Separator />

		<!--Section-->
		<div class="flex flex-col space-y-2">
			<h1>Users:</h1>
			<div class="flex gap-4">
				{#if instanceOwnerUser !== undefined}
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src={instanceOwnerUser?.userIcon || instanceOwnerUser?.currentAvatarImageUrl} alt="Avatar" />
							<Avatar.Fallback>{instanceOwnerUser?.displayName?.charAt(0).toUpperCase() || 'NA'}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">
								{instanceOwnerUser?.displayName || 'Username'}
							</p>
							<p class="text-sm text-muted-foreground">{instanceOwnerUser?.statusDescription || instanceOwnerUser?.status}</p>
						</div>
					</div>
				{/if}
				{#if instanceOwnerGroup !== undefined}
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src={instanceOwnerGroup?.iconUrl} alt="Group Icon" />
							<Avatar.Fallback>{instanceOwnerGroup?.name?.charAt(0).toUpperCase() || 'NA'}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">
								{instanceOwnerGroup?.name || 'Group Name'}
							</p>
							<p class="text-sm text-muted-foreground">Group Owned World</p>
						</div>
					</div>
				{/if}
				{#each friendsInInstance as friend}
					<div class="flex items-center gap-4">
						<Avatar.Root class="hidden h-9 w-9 sm:flex">
							<Avatar.Image src={friend.userIcon || friend.currentAvatarImageUrl} alt="Avatar" />
							<Avatar.Fallback>{friend.displayName.charAt(0).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">
								{friend.displayName}
							</p>
							<p class="text-sm text-muted-foreground">{friend.status}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>