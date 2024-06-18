<script lang="ts">
	import { getClient } from '@tauri-apps/api/http';
	import { isLoggedIn, username, responseMessage, requiresTwoFactorAuth, twoFactorCode, authCookie, twoFactorType } from '$lib/stores/auth.js';
	import { get } from 'svelte/store';

	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";

	let email = '';
	let password = '';

	async function login() {
		try {
			const client = await getClient();
			const encodedCredentials = btoa(`${encodeURIComponent(email)}:${encodeURIComponent(password)}`);

			const response = await client.request({
				method: 'GET',
				url: 'https://api.vrchat.cloud/api/1/auth/user',
				headers: {
					'Authorization': `Basic ${encodedCredentials}`,
					'User-Agent': 'Spectre/1.0 archangel@angelware.net'
				}
			});

			if (response.data.requiresTwoFactorAuth) {
				requiresTwoFactorAuth.set(true);
				twoFactorType.set(response.data.requiresTwoFactorAuth[0]); // Set the 2FA type
			} else if (response.data.username) {
				isLoggedIn.set(true);
				username.set(response.data.username);
				requiresTwoFactorAuth.set(false);
			} else {
				isLoggedIn.set(false);
				requiresTwoFactorAuth.set(false);
			}
			responseMessage.set(JSON.stringify(response.data));

			// Capture the authentication cookie
			const setCookieHeader = response.headers['set-cookie'];
			if (setCookieHeader) {
				const cookie = setCookieHeader.split(';')[0];
				authCookie.set(cookie);
			}
		} catch (err) {
			console.error(err);
			isLoggedIn.set(false);
			requiresTwoFactorAuth.set(false);
			responseMessage.set(err.message);
			console.error(err);
		}
	}

	async function verifyTwoFactor() {
		try {
			const client = await getClient();
			const cookie = get(authCookie);

			const response = await client.request({
				method: 'POST',
				url: `https://api.vrchat.cloud/api/1/auth/twofactorauth/${get(twoFactorType)}/verify`,
				headers: {
					'User-Agent': 'Spectre/1.0 archangel@angelware.net',
					'Cookie': cookie
				},
				body: {
					'code': get(twoFactorCode)
				}
			});

			if (response.data.displayname) {
				isLoggedIn.set(true);
				username.set(response.data.displayname);
				requiresTwoFactorAuth.set(false);
			} else {
				isLoggedIn.set(false);
				requiresTwoFactorAuth.set(false);
			}
			responseMessage.set(JSON.stringify(response.data));
			console.log(response.data)
		} catch (error) {
			isLoggedIn.set(false);
			requiresTwoFactorAuth.set(false);
			responseMessage.set(error.message);
			console.error(error);
		}
	}

	async function logout() {
		try {
			const client = await getClient();
			const cookie = get(authCookie);

			const response = await client.request({
				method: 'PUT',
				url: 'https://api.vrchat.cloud/api/1/logout',
				headers: {
					'User-Agent': 'Spectre/1.0 archangel@angelware.net',
					'Cookie': cookie
				}
			});

			isLoggedIn.set(false);
			username.set('');
			responseMessage.set(response.data);
		} catch (error) {
			responseMessage.set(error.message);
			console.error(error);
		}
	}
</script>

<style>
    /* Add your styles here */
</style>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email and password below to login to your account.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" bind:value={email} placeholder="m@example.com" required />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" bind:value={password} required />
		</div>
		{#if $requiresTwoFactorAuth}
			<div class="grid gap-2">
				<Label for="twoFactorCode">2FA Code</Label>
				<Input id="twoFactorCode" type="text" bind:value={$twoFactorCode} required />
			</div>
		{/if}
	</Card.Content>
	<Card.Footer>
		{#if $requiresTwoFactorAuth}
			<Button class="w-full" on:click={verifyTwoFactor}>Verify 2FA</Button>
		{:else}
			<Button class="w-full" on:click={login}>Sign in</Button>
		{/if}
		<!--		<Button class="w-full" on:click={logout}>Log out</Button>-->
	</Card.Footer>
	<p>{$responseMessage}</p>
	{#if $isLoggedIn}
		<p>Logged in as {$username}</p>
	{/if}
</Card.Root>
