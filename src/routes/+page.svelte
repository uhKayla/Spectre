<script lang="ts">
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import Login from '$lib/components/Login.svelte';
	import { parseUserData } from '$lib/utils/parseUserData';
	import type { UserData } from '$lib/types/user';

	interface UserResponse {
		username: string | null;
		requires_two_factor_auth: string[] | null;
		message: string | null;
		response_body: string | null;
	}

	let isLoading = true;

	onMount(async () => {
		try {
			const isLoggedIn = await invoke<boolean>('is_logged_in');

			if (isLoggedIn) {
				try {
					const loginParams = { encoded_credentials: '' }; // This should be filled with actual data
					const userDataResponse: UserResponse = await invoke('login', { params: loginParams });
					if (userDataResponse.response_body) {
						const userData: UserData = parseUserData(userDataResponse.response_body);
						user.set(userData);
						goto('/home');
					} else {
						throw new Error('No response body in login response');
					}
				} catch (error) {
					const errorMessage = error?.message || error.toString();
					if (errorMessage.includes('401')) {
						isLoading = false;
					} else {
						console.error('Login failed:', errorMessage);
					}
				}
			} else {
				isLoading = false;
			}
		} catch (error) {
			console.error('Error checking login status:', error?.message || error.toString());
			isLoading = false;
		}
	});
</script>

<main class="flex justify-center items-center object-center p-6">
	{#if isLoading}
		<p>Loading...</p>
	{:else}
		<Login />
	{/if}
</main>
