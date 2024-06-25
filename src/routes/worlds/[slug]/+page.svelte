<script lang="ts">
	import WorldSearchProp from '$lib/components/WorldSearchProp.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	onMount(() => {
		console.log(data.post.search)
	});

	let searchQuery = '';

	function handleSearch() {
		if (searchQuery.trim()) {
			goto(`/worlds/${searchQuery}`);
		}
	}
</script>

<main>
	<div class="flex justify-between items-center object-center">
		<div class="p-6">
			<div class="text-3xl">
			Worlds
			</div>
			<div class="text-md text-muted-foreground">
				Search: {data.post.search}
			</div>
		</div>

		<div class="p-6">
			<div class="relative ml-auto flex-1 md:grow-0">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
					bind:value={searchQuery}
					on:keydown={(event) => event.key === 'Enter' && handleSearch()}
				/>
			</div>
		</div>
	</div>

	<WorldSearchProp searchString={data.post.search} />
</main>
