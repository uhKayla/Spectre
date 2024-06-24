<script lang="ts">
	import WorldSearch from '$lib/components/WorldSearch.svelte';
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { mediaQuery } from "svelte-legos";
	import * as Pagination from "$lib/components/ui/pagination/index.js";
	import { writable } from 'svelte/store';
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';

	// Declare the store at the top level
	const currentPage = writable(0);

	const isDesktop = mediaQuery("(min-width: 768px)");
	let count = 100; // Set this to the total number of items (or a placeholder value if unknown)
	let perPage = 18; // Fixed perPage value since it doesn't seem to change based on desktop or mobile
	let siblingCount = $isDesktop ? 1 : 0;

	function handlePageChange(page) {
		currentPage.set(page.value - 1);
	}

	// Reactive statement for count, perPage, and siblingCount
	$: perPage = $isDesktop ? 18 : 18;
	$: siblingCount = $isDesktop ? 1 : 0;

	// Reactive statement to get the current page value from the store
	let current_page_value: number;
	currentPage.subscribe(value => {
		current_page_value = value;
	});
</script>

<main>
	<div class="flex justify-between">
		<div class="text-3xl p-6">
			Worlds
		</div>
		<div class="p-6">
			<div class="relative ml-auto flex-1 md:grow-0">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
				/>
			</div>
		</div>
	</div>

	<WorldSearch page={current_page_value} />

	<Pagination.Root {count} {perPage} {siblingCount} let:pages let:current_page>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeft class="h-4 w-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === "ellipsis"}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={current_page_value === page.value - 1} on:click={() => handlePageChange(page)}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton>
					<span class="hidden sm:block">Next</span>
					<ChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</main>
