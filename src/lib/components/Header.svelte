<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { open } from '@tauri-apps/api/shell';
	import { invoke } from '@tauri-apps/api';
	import { goto } from '$app/navigation';

	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Button } from "$lib/components/ui/button/index.js";

	import Sun from "lucide-svelte/icons/sun";
	import Moon from "lucide-svelte/icons/moon";
	import CircleUser from "lucide-svelte/icons/circle-user";
	import Menu from "lucide-svelte/icons/menu";
	import Globe from 'lucide-svelte/icons/globe';

	async function logout() {
		try {
			const result = await invoke('logout');
			console.log(result);
			await goto('/login');
		} catch (error) {
			console.error(error);
		}
	}

	const openGithub = () => {
		open('https://github.com/uhKayla/spectre');
	}
</script>

<style>
	.header{
			z-index: 1;
	}
</style>

<header class="header sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav
		class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
		<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<Globe class="h-6 w-6" />
			<span class="sr-only">Acme Inc</span>
		</a>
		<a href="/dash" class="text-foreground transition-colors hover:text-foreground">
			Dashboard
		</a>
		<a href="/friends" class="text-muted-foreground transition-colors hover:text-foreground">
			Friends
		</a>
		<a href="/feed" class="text-muted-foreground transition-colors hover:text-foreground">
			Feed
		</a>
	</nav>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button
				variant="outline"
				size="icon"
				class="shrink-0 md:hidden"
				builders={[builder]}
			>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left">
			<nav class="grid gap-6 text-lg font-medium">
				<a href="##" class="flex items-center gap-2 text-lg font-semibold">
					<Globe class="h-6 w-6" />
					<span class="sr-only">Acme Inc</span>
				</a>
				<a href="/dash" class="hover:text-foreground"> Dashboard </a>
				<a href="/friends" class="text-muted-foreground hover:text-foreground"> Friends </a>
				<a href="/feed" class="text-muted-foreground hover:text-foreground"> Feed </a>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
		<div class="ml-auto flex-1 sm:flex-initial" />
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="secondary"
					size="icon"
					class="rounded-full"
				>
					<CircleUser class="h-5 w-5" />
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item on:click={openGithub}>Github</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
