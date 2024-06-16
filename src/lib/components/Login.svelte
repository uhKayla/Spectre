<script lang="ts">
	import { invoke } from '@tauri-apps/api';
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { encode as base64_encode } from 'js-base64';

	let email = '';
	let password = '';
	let twoFactorCode = '';
	let responseMessage = '';
	let requiresTwoFactorAuth = false;
	let useEmailOtp = false;

	async function login() {
		try {
			const encodedCredentials = base64_encode(`${email}:${password}`);
			const result = await invoke('login', {
				params: {
					encoded_credentials: encodedCredentials
				}
			});
			if (result.requires_two_factor_auth) {
				requiresTwoFactorAuth = true;
				useEmailOtp = result.requires_two_factor_auth.includes('emailOtp');
			} else {
				responseMessage = result.message || `User: ${result.username}`;
			}
			console.log(result);
		} catch (error) {
			responseMessage = error;
			console.error(error);
		}
	}

	async function verifyTwoFactor() {
		try {
			const result = await invoke('verify_two_factor', {
				params: {
					code: twoFactorCode,
					use_email: useEmailOtp
				}
			});
			responseMessage = result;
			requiresTwoFactorAuth = false;
			useEmailOtp = false;
			console.log(result);
		} catch (error) {
			responseMessage = error;
			console.error(error);
		}
	}

	async function logout() {
		try {
			const result = await invoke('logout');
			responseMessage = result;
			console.log(result);
		} catch (error) {
			responseMessage = error;
			console.error(error);
		}
	}
</script>

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
		{#if requiresTwoFactorAuth}
			<div class="grid gap-2">
				<Label for="twoFactorCode">2FA Code</Label>
				<Input id="twoFactorCode" type="text" bind:value={twoFactorCode} required />
			</div>
		{/if}
	</Card.Content>
	<Card.Footer>
		{#if requiresTwoFactorAuth}
			<Button class="w-full" on:click={verifyTwoFactor}>Verify 2FA</Button>
		{:else}
			<Button class="w-full" on:click={login}>Sign in</Button>
		{/if}
		<Button class="w-full" on:click={logout}>Log out</Button>
	</Card.Footer>
	<p>{responseMessage}</p>
</Card.Root>
