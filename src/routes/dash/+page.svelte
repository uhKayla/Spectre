<script lang="ts">
	import FriendsCard from '$lib/components/cards/FriendsCard.svelte';
	import JoinableCard from '$lib/components/cards/JoinableCard.svelte';
	import TotalPlayerCard from '$lib/components/cards/TotalPlayerCard.svelte';
	import CalloutCard from '$lib/components/cards/CalloutCard.svelte';
	import BarCard from '$lib/components/cards/BarCard.svelte';
	import EventsCard from '$lib/components/cards/EventsCard.svelte';

	import { user } from '$lib/stores/user';
	import type { UserData } from '$lib/types/user';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getJoinableUsers } from '$lib/utils/getJoinableUsers';

	// Subscribe to the user store and get the online friends count
	let onlineFriendsCount = 0;
	let joinableUsersCount = 0;

	user.subscribe((userData: UserData | null) => {
		if (userData) {
			onlineFriendsCount = userData.onlineFriends.length;
		} else {
			// If userData is null, redirect to home page
			goto('/');
		}
	});

	onMount(() => {
		joinableUsersCount = getJoinableUsers();
		console.log(joinableUsersCount)
	});
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
		<TotalPlayerCard totalOnline={24760} />
	</div>
	<div class="p-4 gap-4 h-1/2">
		<BarCard />
	</div>
	<div class="p-4 gap-4 h-1/2">
		<EventsCard />
	</div>
</div>
