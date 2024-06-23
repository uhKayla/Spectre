<script lang="ts">
	import { onMount } from 'svelte';
	import { loadOwnAvatar } from '$lib/utils/getOwnAvatar';
	import { ownAvatar } from '$lib/stores/ownAvatarStore';
	import { get } from 'svelte/store';
	import type { OwnAvatarData } from '$lib/types/ownAvatar';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Card from "$lib/components/ui/card";

	export let userId: string;

	let avatarData: OwnAvatarData | null = null;
	let loading: boolean = true;

	const fetchAvatarData = async () => {
		try {
			loading = true;
			avatarData = await loadOwnAvatar(userId);
		} catch (error) {
			console.error('Failed to load avatar data:', error);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		fetchAvatarData();
	});
</script>

<style>
    .loading {
        font-size: 1.5rem;
    }
</style>

<main>
	{#if loading}
		<div class="loading">Loading...</div>
	{:else if avatarData}
<!--		<ScrollArea class="h-[300px]">-->
			<Card.Root>
				<Card.Header>
					<img src="{avatarData.imageUrl}" alt="{avatarData.name}" class="h-[240px] object-cover" />
					<h1 class="text-2xl">Current Avatar</h1>
					<h2 class="text-lg">{avatarData.name}</h2>
				</Card.Header>
				<Card.Content>
					{#if avatarData.description !== avatarData.name}
						<p>{avatarData.description}</p>
					{/if}
					<p>
						Author:
						<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
							{avatarData.authorName}
						</code>
					</p>
					<p>Release Status:
						<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
							{avatarData.releaseStatus}
						</code>
					</p>
				</Card.Content>
			</Card.Root>
<!--		</ScrollArea>-->
	{:else}
		<div class="error">No avatar data found.</div>
	{/if}
</main>
