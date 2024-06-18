<script lang="ts">
	import { makeRequest } from '$lib/rust/makeRequest';
	import { Button } from '$lib/components/ui/button';

	async function handleRequest() {
		try {
			const url = 'https://vrchat.com/api/1/auth/user/friends?offline=false';
			const method = 'GET';
			const response = await makeRequest(url, method);
			console.log('Request successful:', response);
		} catch (error) {
			console.error('Request failed:', error);
		}
	}
</script>

<Button on:click={handleRequest}>Make Request</Button>
