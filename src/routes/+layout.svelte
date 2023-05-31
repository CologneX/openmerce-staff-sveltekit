<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell slotSidebarLeft="">
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>
	<main class=" container">
		<slot />
	</main>
</AppShell>
