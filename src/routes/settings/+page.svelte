<script lang="ts">
	import * as Select from "$lib/components/ui/select/index.js";
	import { toggleMode } from 'mode-watcher';
	import { switchTheme } from '$lib/utils/themeSwitcher';
	import { Button } from '$lib/components/ui/button';
	import * as Card from "$lib/components/ui/card";
	import Footer from '$lib/components/Footer.svelte';
	import { open } from '@tauri-apps/api/shell';
	import * as Table from "$lib/components/ui/table/index.js";
	import { Separator } from '$lib/components/ui/separator';

	const themes = [
		{ value: "default", label: "Default" },
		{ value: "rose", label: "Rose" },
		{ value: "blue", label: "Sky" },
		{ value: "green", label: "Forest" },
		{ value: "orange", label: "Autumn" },
		{ value: "violet", label: "Violet" }
	];

	function handleThemeChange(value: { value: string, label: string } | undefined) {
		if (value) {
			console.log(`Theme switched to ${value.value}`);
			switchTheme(value.value);
		}
	}

	const openGithub = () => {
		open('https://github.com/uhKayla/spectre');
	};
</script>

<main>
	<div class="flex flex-col w-full p-6">
		<h1 class="text-2xl p-4 pb-1">Settings</h1>
		<p class="text-muted-foreground p-4 pt-0">Changes are updated and saved automagically. 🪄</p>

		<div class="p-4">
			<Table.Root>
				<Separator />
				<Table.Row class="flex flex-row justify-between">
					<Table.Cell>
						<h2 class="pt-2">Theme</h2>
					</Table.Cell>
					<Table.Cell>
					<div>
						<Select.Root onSelectedChange={handleThemeChange}>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Select a theme" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Themes</Select.Label>
									{#each themes as theme}
										<Select.Item value={theme.value} label={theme.label}>{theme.label}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name="themeSelector" />
						</Select.Root>
					</div>
					</Table.Cell>
				</Table.Row>
			</Table.Root>
		</div>
	</div>

	<div class="absolute bottom-0">
		<Footer />
	</div>
</main>
