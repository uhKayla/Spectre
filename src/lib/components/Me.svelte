<script lang="ts">
	import { user } from "$lib/stores/user"
	import type { UserData } from "$lib/types/user"

	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { open } from '@tauri-apps/api/shell';

	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Card from "$lib/components/ui/card";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import * as Tabs from "$lib/components/ui/tabs";

	import Link from "lucide-svelte/icons/link";
	import Twitter from "lucide-svelte/icons/twitter";
	import Twitch from "lucide-svelte/icons/twitch";
	import YouTube from "lucide-svelte/icons/youtube";
	import Github from "lucide-svelte/icons/github";
	import Facebook from "lucide-svelte/icons/facebook";
	import Instagram from "lucide-svelte/icons/instagram";
	import Bio from '$lib/components/userComponent/Bio.svelte';
	import Json from '$lib/components/userComponent/Json.svelte';
	import OwnAvatar from '$lib/components/userComponent/OwnAvatar.svelte';

	let currentUser: UserData | null;

	currentUser = get(user)

	const unsubscribe = user.subscribe((userData) => {
		currentUser = userData;
	});

	onMount(() => {
		// Clean up the subscription when the component is unmounted
		return () => {
			unsubscribe();
		};
	});

	const tagToBadgeMap: { [key: string]: string } = {
		"system_supporter": "VRC+",
		"system_trust_basic": "User",
		"system_trust_known": "Known User",
		"system_trust_trusted": "Trusted User",
		"language_eng": "English",
		"language_tur": "Turkish",
		"language_deu": "Deutch",
		"language_jp": "Japanese",
		"language_kor": "Korean",
		"language_por": "Portuguese"
	};

	const tagToColorMap: { [key: string]: string } = {
		"system_trust_basic": "blue",
		"system_trust_known": "orange",
		"system_trust_trusted": "purple",
		"system_supporter": "gold",
		"language_eng": "white",
		"language_tur": "white",
		"language_deu": "white",
		"language_jp": "white",
		"language_kor": "white",
		"language_por": "white"
	};

	const tagPriority = {
		"system_trust_trusted": 3,
		"system_trust_known": 2,
		"system_trust_basic": 1
	};

	const linkIconMap: { [key: string]: any } = {
		"twitter.com": Twitter,
		"twitch.com": Twitch,
		"youtube.com": YouTube,
		"github.com": Github,
		"facebook.com": Facebook,
		"instagram.com": Instagram
	};

	function getFilteredTags(tags) {
		if (!tags) return [];

		const prioritizedTag = tags.reduce((highest, tag) => {
			if (tagPriority[tag] > (tagPriority[highest] || 0)) {
				return tag;
			}
			return highest;
		}, null);

		const nonPrioritizedTags = tags.filter(tag => !tagPriority[tag] || tag === prioritizedTag);
		return [prioritizedTag, ...nonPrioritizedTags.filter(tag => tag !== prioritizedTag)];
	}

	function getIconForLink(link: string) {
		for (const domain in linkIconMap) {
			if (link.includes(domain)) {
				return linkIconMap[domain];
			}
		}
		return Link;
	}

	const openUrl = (link: string) => {
		open(link)
	}

	function formatUserData(userData: UserData | null): string {
		return JSON.stringify(userData, null, 2);
	}
</script>

<div class="grid gap-8">
	<div class="flex items-center gap-4">
		<Avatar.Root class="hidden h-9 w-9 sm:flex">
			<Avatar.Image src={currentUser?.userIcon || currentUser?.currentAvatarImageUrl} alt="Avatar" />
			<Avatar.Fallback>{currentUser?.displayName?.charAt(0).toUpperCase() || 'NA'}</Avatar.Fallback>
		</Avatar.Root>
		<div class="grid gap-1">
			<p class="text-sm font-medium leading-none">
				{currentUser?.displayName || 'Username'}
			</p>
			<p class="text-sm text-muted-foreground">{currentUser?.statusDescription || currentUser?.status}</p>
		</div>
		<Button class="ml-auto font-medium">View Website</Button>
	</div>
	<p>
		{#each getFilteredTags(currentUser?.tags) as tag}
			{#if tagToBadgeMap[tag]}
				<Badge variant="outline" style="border-color: {tagToColorMap[tag]}; color: white;">
					{tagToBadgeMap[tag]}
				</Badge>
			{/if}
		{/each}
	</p>
	<Separator />
	<Tabs.Root value="bio" class="w-[400px]">
		<Tabs.List class="grid w-full grid-cols-4">
			<Tabs.Trigger value="bio">Bio</Tabs.Trigger>
			<Tabs.Trigger value="avatar">Avatars</Tabs.Trigger>
			<Tabs.Trigger value="worlds">Worlds</Tabs.Trigger>
			<Tabs.Trigger value="json">JSON</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="bio">
			<Bio currentUser="{currentUser}"/>
		</Tabs.Content>
		<Tabs.Content value="avatar">
			{#if currentUser !== null}
				<OwnAvatar userId="{currentUser.id}"/>
			{:else}
				Avatar couldn't be loaded!
			{/if}
		</Tabs.Content>
		<Tabs.Content value="json">
			<Json currentUser="{currentUser}"/>
		</Tabs.Content>
	</Tabs.Root>
</div>