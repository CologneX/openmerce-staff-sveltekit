<script lang="ts">
	import Box from '$lib/Icons/Box.svelte';
	import {
		AppRail,
		AppRailAnchor,
		AppRailTile,
		LightSwitch,
		Avatar,
		Accordion,
		AccordionItem
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Logo from '$lib/Icons/Logo.svelte';
	import Home from '$lib/Icons/Home.svelte';
	let btnClassSidebar = 'flex font-bold text-base px-5 py-2 w-full';
</script>

<AppRail width="w-64">
	<!-- <AppRailAnchor href="/" title="Home" selected={$page.url.pathname === '/'}> -->
	<span class="">
		<Logo height="auto" />
	</span>
	<!-- </AppRailAnchor> -->
	<ul class="p-4 flex items-center">
		<span> <Avatar initials="JD" rounded="rounded-lg" width="w-10" /></span>
		<span>&emsp;Nama</span>
	</ul>

	<Accordion regionControl=" font-bold px-6">
		<a
			href="/"
			class="{btnClassSidebar} {$page.url.pathname === '/' ? 'text-primary-500 !border-l-2 !border-separate' : 'px-6'}"
		>
			<span><Home /></span>
			<span>&emsp;Home</span>
		</a>
		<AccordionItem >
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Product</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-product"
					class="btn {$page.url.pathname === '/add-product' ? 'text-primary-500' : ''} border-2"
					>Add Product</a
				><a
					href="/product-list"
					class="btn {$page.url.pathname === '/product-list' ? 'text-primary-500' : ''}"
					>Product List</a
				>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<!-- <ul>
		<a
			href="/add-product"
			class="{btnClassSidebar} {$page.url.pathname === '/add-product' ? 'text-primary-500' : ''}"
			>Add Product</a
		>
	</ul> -->
</AppRail>
