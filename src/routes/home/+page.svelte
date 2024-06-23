<script lang="ts">
	import '$lib/styles/stars.css';
	import ArrowUpRight from "lucide-svelte/icons/square-arrow-up-right";
	import { Button } from "$lib/components/ui/button/index.js";
	import Footer from '$lib/components/Footer.svelte';
	import { user } from '$lib/stores/user';
	import type { UserData } from '$lib/types/user';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let onlineFriendsCount = 0;

	// Subscribe to the user store and get the online friends count
	user.subscribe((userData: UserData | null) => {
		if (userData) {
			onlineFriendsCount = userData.onlineFriends.length;
		} else {
			// If userData is null, redirect to home page
			goto('/');
		}
	});
</script>

<style>
    .content {
        z-index: 10;
    }
</style>

<div class="content flex justify-end items-center p-10 h-96 text-end">
	<div>
		<div class="p-4">
			<p class="text-5xl font-mono">Welcome</p>
			<p class="text-2xl font-mono">Friends Online: <b>{onlineFriendsCount}</b></p>
		</div>
		<div class="p-4">
				<Button href="/dash">Dashboard&nbsp;<ArrowUpRight class="w-4 h-4" /></Button>
		</div>
	</div>
</div>

<div class="stars-container">
	<div class="sky">
		<div class="stars"></div>
		<div class="stars1"></div>
		<div class="stars2"></div>
	</div>
</div>

<div class="absolute bottom-0">
	<Footer />
</div>
