<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type { UserData } from '$lib/types/user.js';

	export let currentUser: UserData | null;

	function formatUserData(userData: UserData | null): string {
		return JSON.stringify(userData, null, 2);
}
</script>

<ScrollArea class="h-[500px] rounded-md border p-4" orientation="both">
	<pre class="text-sm" style="white-space: pre-line">{formatUserData(currentUser)}</pre>
</ScrollArea>