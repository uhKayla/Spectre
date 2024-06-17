<script lang="ts">
	import FriendsCard from '$lib/components/cards/FriendsCard.svelte';
	import JoinableCard from '$lib/components/cards/JoinableCard.svelte';
	import TotalPlayerCard from '$lib/components/cards/TotalPlayerCard.svelte';
	import CalloutCard from '$lib/components/cards/CalloutCard.svelte';
	import BarCard from '$lib/components/cards/BarCard.svelte';
	import EventsCard from '$lib/components/cards/EventsCard.svelte';
</script>

<div class="grid grid-cols-4 p-4 h-1/2">
	<div class="p-4 gap-4">
		<FriendsCard friendsOnline={53} />
	</div>
	<div class="p-4 gap-4 h-1/2">
		<JoinableCard joinableOnline={3} />
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