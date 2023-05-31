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
	let btnClassSidebar = 'flex font-bold text-base px-5 py-2 w-full rounded-sm';
</script>

<AppRail width="w-64">
	<!-- <AppRailAnchor href="/" title="Home" selected={$page.url.pathname === '/'}> -->
	<span class="px-10">
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
			class="{btnClassSidebar} {$page.url.pathname === '/'
				? 'text-primary-500 !border-l-4'
				: 'px-6'}"
		>
			<span><Home /></span>
			<span>&emsp;Home</span>
		</a>
		<AccordionItem
			regionControl={$page.url.pathname === '/add-product' || $page.url.pathname === '/product-list'
				? 'text-primary-500 !border-l-4 px-5'
				: 'px-6'}
		>
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Product</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-product"
					class="btn {$page.url.pathname === '/add-product' ? 'text-primary-500' : ''}"
					>Add Product</a
				><a
					href="/product-list"
					class="btn {$page.url.pathname === '/product-list' ? 'text-primary-500' : ''}"
					>Product List</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem
			regionControl={$page.url.pathname === '/add-category' ||
			$page.url.pathname === '/category-list'
				? 'text-primary-500 !border-l-4 px-5'
				: 'px-6'}
		>
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Category</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-category"
					class="btn {$page.url.pathname === '/add-category' ? 'text-primary-500' : ''}"
					>Add Category</a
				><a
					href="/category-list"
					class="btn {$page.url.pathname === '/category-list' ? 'text-primary-500' : ''}"
					>Category List</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem
			regionControl={$page.url.pathname === '/add-banner' || $page.url.pathname === '/banner-list'
				? 'text-primary-500 !border-l-4 px-5'
				: 'px-6'}
		>
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Banner</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-banner"
					class="btn {$page.url.pathname === '/add-banner' ? 'text-primary-500' : ''}">Add Banner</a
				><a
					href="/banner-list"
					class="btn {$page.url.pathname === '/banner-list' ? 'text-primary-500' : ''}"
					>Banner List</a
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
