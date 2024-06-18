<script lang="ts">
	import '$lib/styles/stars.css'

	import ArrowUpRight from "lucide-svelte/icons/square-arrow-up-right";

	import { Button } from "$lib/components/ui/button/index.js";
	import Footer from '$lib/components/Footer.svelte';

	import { isLoggedIn } from '$lib/stores/auth'

	let loggedIn: boolean;
	isLoggedIn.subscribe(value => {
		loggedIn = value;
	});
</script>

<style>
	.content{
			z-index: 10;
	}
</style>

<div class="content flex justify-end items-center p-10 h-96 text-end">
	<div>
		<div class="p-4">
			<p class="text-5xl font-mono">Welcome</p>
			<p class="text-2xl font-mono">Friends Online: <b>54</b></p>
		</div>
		<div class="p-4">
			{#if loggedIn}
			<Button href="/dash">Dashboard&nbsp;<ArrowUpRight class="w-4 h-4" /></Button>
			{:else}
			<Button href="/login">Login&nbsp;<ArrowUpRight class="w-4 h-4" /></Button>
			{/if}
		</div>
	</div>
</div>

<div class="stars-container">
	<div class="sky">
		<div class="stars"></div>
		<div class="stars1"></div>
		<div class="stars2"></div>
	</div>
</div>


<div class="absolute bottom-0"><Footer /></div>

