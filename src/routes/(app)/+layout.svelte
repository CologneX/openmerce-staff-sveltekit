<script lang="ts">
	onMount(() => {
		if (!getStaffUsername()) {
			isStaffLoggedInStore.set(false);
			goto('/login');
		} else {
			isStaffLoggedInStore.set(true);
		}
	});
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { isStaffLoggedInStore } from '$lib/utils/stores';
	import { goto } from '$app/navigation';
	import { getStaffUsername } from '$lib/utils/auth';
	import { onMount } from 'svelte';
</script>

<AppShell slotSidebarLeft="">
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>
	<main class="container px-20 py-24 h-full">
		<slot />
	</main>
</AppShell>
