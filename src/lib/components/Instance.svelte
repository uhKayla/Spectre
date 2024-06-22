<script lang="ts">
import { Button } from '$lib/components/ui/button/index.js';
import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
import { Badge } from '$lib/components/ui/badge/index.js';
import { Separator } from '$lib/components/ui/separator/index.js';
import * as Card from "$lib/components/ui/card";
import * as Avatar from "$lib/components/ui/avatar";

import type { ExternalUserData } from '$lib/types/externalUser';
import type { InstanceData } from '$lib/types/instance';

import { open } from '@tauri-apps/api/shell';
import { onMount } from 'svelte';
import { get } from 'svelte/store';

import { externalUserData } from '$lib/stores/externalUserStore';
import { instanceDataStore } from '$lib/stores/instanceStore';
import { loadUser } from '$lib/utils/getUser';


export let userId: string;
let instance: InstanceData | undefined;
let instanceOwnerUser: ExternalUserData | undefined;

const openUrl = (link: string) => {
	open(link)
}

onMount(async () => {
	const userMap = get(instanceDataStore);
	instance = userMap.get(userId);

	if (instance?.ownerId.startsWith("usr")) {
		instanceOwnerUser = await loadUser(instance?.ownerId)
	}
});
</script>

<div class="grid gap-8">
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
		<Button class="ml-auto font-medium">View Instance</Button>
	</div>

	<Separator class="" />
	<div class="flex flex-col space-y-2">
		<h1>Bio:</h1>
		<ScrollArea class="h-40 rounded-md border p-4" orientation="both">
			<p class="text-sm" style="white-space: pre-line">{instance?.world.description}</p>
		</ScrollArea>
	</div>
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
					<p class="text-sm text-muted-foreground">Owner</p>
				</div>
			</div>
			{/if}
		</div>
	</div>
</div>