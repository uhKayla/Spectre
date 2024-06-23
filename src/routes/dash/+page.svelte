<script lang="ts">
	import FriendsCard from '$lib/components/cards/FriendsCard.svelte';
	import JoinableCard from '$lib/components/cards/JoinableCard.svelte';
	import TotalPlayerCard from '$lib/components/cards/TotalPlayerCard.svelte';
	import CalloutCard from '$lib/components/cards/CalloutCard.svelte';
	import BarCard from '$lib/components/cards/BarCard.svelte';
	import EventsCard from '$lib/components/cards/EventsCard.svelte';

	import ArrowUpRight from "lucide-svelte/icons/square-arrow-up-right";

	import { user } from '$lib/stores/user';
	import type { UserData } from '$lib/types/user';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getJoinableUsers } from '$lib/utils/getJoinableUsers';
	import { getUsersOnline } from '$lib/utils/getUsersOnline';
	import { get } from 'svelte/store';
	import { friends } from '$lib/stores/friendsStore';
	import { externalUserData } from '$lib/stores/externalUserStore';
	import { instanceDataStore } from '$lib/stores/instanceStore';
	import { loadFriendsAndUserData } from '$lib/utils/loadFriendList';

	// Subscribe to the user store and get the online friends count
	let onlineFriendsCount = 0;
	let joinableUsersCount = 0;
	let onlineUsers = 0;
	let loading = true;

	user.subscribe((userData: UserData | null) => {
		if (userData) {
			onlineFriendsCount = userData.onlineFriends.length;
		} else {
			// If userData is null, redirect to home page
			goto('/');
		}
	});

	onMount(async () => {
		joinableUsersCount = getJoinableUsers();
		console.log(joinableUsersCount);

		onlineUsers = await getUsersOnline();
		console.log(onlineUsers);

		await initializeData();
	});

	const initializeData = async (forceReload = false) => {
		const friendsStore = get(friends);
		const externalUserDataStore = get(externalUserData);
		const instanceStore = get(instanceDataStore);

		if (forceReload || friendsStore.size === 0 || externalUserDataStore.size === 0 || instanceStore.size === 0) {
			loading = true;
			console.log(`Reloading Data: ${forceReload}`);
			await loadFriendsAndUserData();
			loading = false;
		}
	};
</script>

<div class="grid grid-cols-4 p-4 h-1/2">
	<div class="p-4 gap-4">
		<FriendsCard friendsOnline={onlineFriendsCount} />
	</div>
	<div class="p-4 gap-4 h-1/2">
		<JoinableCard joinableOnline={joinableUsersCount} />
	</div>
	<div class="col-span-2 p-4 gap-4 h-1/2">
		<CalloutCard />
	</div>
	<div class="col-span-2 p-4 gap-4 h-1/2">
		<TotalPlayerCard totalOnline={onlineUsers} />
	</div>
	<div class="p-4 gap-4 h-1/2">
		<BarCard />
	</div>
	<div class="p-4 gap-4 h-1/2">
		<EventsCard />
	</div>
</div>
