<script lang="ts">
	import { user } from '$lib/stores/user';
	import type { UserData } from '$lib/types/user';
	import { goto } from '$app/navigation';
	import { getUsersOnline } from '$lib/utils/getUsersOnline';
	import { onMount } from 'svelte';
	import { getApiTime } from '$lib/utils/getApiTime';
	import { getOnlineUsers } from '$lib/utils/getOnlineUsers';
	import { open } from '@tauri-apps/api/shell';
	import { reloadData } from '$lib/functions/loadData';
	import { get } from 'svelte/store';
	import { checkUserStatus } from '$lib/functions/checkUserStatus';

	let onlineFriendsCount = 0;
	let onlineUsers = 0;
	let dateTime: string = '';
	let currentTime: string = 'Loading...';
	let currentlyOnline: boolean = false;

	function cleanDateTimeString(dateTime: string): string {
		// Remove any extraneous quotes and trim the string
		return dateTime.replace(/(^")|("$)/g, '').trim();
	}

	function updateCurrentTime(initialDateTime: string) {
		try {
			const cleanedDateTime = cleanDateTimeString(initialDateTime);
			const date = new Date(cleanedDateTime);
			if (isNaN(date.getTime())) {
				throw new Error('Invalid Date');
			}
			const now = new Date();
			const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
			date.setSeconds(date.getSeconds() + diffInSeconds);
			currentTime = date.toLocaleTimeString();
		} catch (error) {
			console.error('Error updating current time:', error);
			currentTime = 'Invalid Date';
		}
	}

	const openAw = () => {
		open('https://angelware.net');
	};

	onMount(async () => {
		try {
			await reloadData(false);
			currentlyOnline = await checkUserStatus();
			onlineFriendsCount = await getOnlineUsers();
			onlineUsers = await getUsersOnline();
			dateTime = await getApiTime();
			if (!dateTime) {
				throw new Error('Invalid dateTime fetched from API');
			}
			updateCurrentTime(dateTime);
			setInterval(() => updateCurrentTime(dateTime), 1000);
		} catch (error) {
			console.error('Error on mount:', error);
		}
	});

	$: tickerClass = currentlyOnline ? 'bg-green' : 'bg-background';
</script>

<style>
    :root {
        --ticker-bg-color: hsl(var(--background));
    }

    .ticker-container.bg-green {
        --ticker-bg-color: green;
    }

    .ticker-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ticker-wrapper {
        position: relative;
        width: 30%;
        overflow: hidden;
    }

    .ticker-wrapper::before,
    .ticker-wrapper::after {
        content: '';
        position: absolute;
        top: 0;
        width: 15%;
        height: 100%;
        pointer-events: none;
    }

    .ticker-wrapper::before {
        left: 0;
        background: linear-gradient(to right, var(--ticker-bg-color), transparent);
        z-index: 1;
    }

    .ticker-wrapper::after {
        right: 0;
        background: linear-gradient(to left, var(--ticker-bg-color), transparent);
    }

    /* ticker https://code-boxx.com/html-css-news-ticker-horizontal-vertical/*/
    .hmove {
        display: flex;
        justify-content: space-between;
    }
    .hitem {
        width: 100%;
        flex-shrink: 0;
    }
    .hwrap {
        overflow: hidden;
        justify-content: space-between;
    }

    @keyframes tickerh {
        0% {
            transform: translatex(100%);
        }
        100% {
            transform: translatex(-400%);
        }
    }
    .hmove {
        animation: tickerh linear 20s infinite;
    }
    .hmove:hover {
        animation-play-state: paused;
    }
    /* end ticker */
</style>

<footer class="h-10 flex justify-center items-center w-screen bg-background border-t">
	<div class="ticker-container {tickerClass}">
		<div class="font-mono ticker-wrapper">
			<div class="hwrap">
				<div class="hmove">
					<a class="hitem" on:click={openAw} href="/">Made with ❤️ by ANGELWARE</a>
					<div class="hitem">Online Friends: {onlineFriendsCount}</div>
					<div class="hitem">Online Users: {onlineUsers}</div>
					<div class="hitem">VRChat Time: {currentTime}</div>
				</div>
			</div>
		</div>
	</div>
</footer>
