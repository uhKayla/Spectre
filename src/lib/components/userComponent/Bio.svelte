<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { UserData } from '$lib/types/user.js';

	import Link from "lucide-svelte/icons/link";
	import Twitter from "lucide-svelte/icons/twitter";
	import Twitch from "lucide-svelte/icons/twitch";
	import YouTube from "lucide-svelte/icons/youtube";
	import Github from "lucide-svelte/icons/github";
	import Facebook from "lucide-svelte/icons/facebook";
	import Instagram from "lucide-svelte/icons/instagram";

	import { open } from '@tauri-apps/api/shell';

	export let currentUser: UserData | null;

	const linkIconMap: { [key: string]: any } = {
		"twitter.com": Twitter,
		"twitch.com": Twitch,
		"youtube.com": YouTube,
		"github.com": Github,
		"facebook.com": Facebook,
		"instagram.com": Instagram
	};

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
</script>

<div class="flex flex-col space-y-2">
	<h1>Bio:</h1>
	<ScrollArea class="h-40 rounded-md border p-4" orientation="both">
		<p class="text-sm" style="white-space: pre-line">{currentUser?.bio}</p>
	</ScrollArea>
</div>
<div class="flex flex-col space-y-2">
	<h1>Links:</h1>
	<div class="flex gap-4">
		{#each currentUser?.bioLinks ?? [] as link}
			<Button variant="ghost" size="icon" on:click={openUrl(link)}><svelte:component this={getIconForLink(link)} /></Button>
		{/each}
	</div>
</div>