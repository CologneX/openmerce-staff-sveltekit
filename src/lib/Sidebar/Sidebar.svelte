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
	import Login from '$lib/Icons/Login.svelte';
	import { isStaffLoggedInStore } from '../../routes/utils/stores';
	import { logoutStaff } from '../../routes/utils/auth';
	import Logout from '$lib/Icons/Logout.svelte';
	let btnClassSidebar = 'flex font-bold text-base px-5 py-5 w-full rounded-sm';
</script>

<AppRail width="w-64" regionTrail="flex items-center px-10 py-2 justify-center">
	<!-- <AppRailAnchor href="/" title="Home" selected={$page.url.pathname === '/'}> -->

	<!-- </AppRailAnchor> -->
	<!-- <AppRailTile>

	</AppRailTile> -->
	<svelte:fragment slot="lead">
		<span class="px-10">
			<Logo height="auto" />
		</span>
		{#if $isStaffLoggedInStore}
			<div class="flex p-5 font-semibold card">
				<Avatar initials="JD" rounded="rounded-lg" width="w-10" />
				<div class="border-2 w-full">&emsp;Nama</div>
			</div>
		{/if}
	</svelte:fragment>

	<Accordion>
		<a
			href="/"
			class="{btnClassSidebar} {$page.url.pathname === '/'
				? 'text-primary-500 border-l-4 border-primary-500'
				: 'px-6'}"
		>
			<span><Home /></span>
			<span>&emsp;Home</span>
		</a>
		<AccordionItem
			regionControl="font-semibold py-6 {$page.url.pathname === '/add-product' ||
			$page.url.pathname === '/product-list'
				? 'text-primary-500 border-l-4 border-primary-500 px-5'
				: 'px-6'}"
		>
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Product</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-product"
					class="btn {$page.url.pathname === '/add-product'
						? 'text-primary-500'
						: ''} hover:font-semibold">Add Product</a
				><a
					href="/product-list"
					class="btn {$page.url.pathname === '/product-list'
						? 'text-primary-500'
						: ''} hover:font-semibold">Product List</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem
			regionControl="font-semibold py-6 {$page.url.pathname === '/add-category' ||
			$page.url.pathname === '/category-list'
				? 'text-primary-500 border-l-4 border-primary-500 px-5'
				: 'px-6'}"
		>
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Category</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-category"
					class="btn {$page.url.pathname === '/add-category'
						? 'text-primary-500'
						: ''} hover:font-semibold">Add Category</a
				><a
					href="/category-list"
					class="btn {$page.url.pathname === '/category-list'
						? 'text-primary-500'
						: ''} hover:font-semibold">Category List</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem
			regionControl="font-semibold py-6 {$page.url.pathname === '/add-banner' ||
			$page.url.pathname === '/banner-list'
				? 'text-primary-500 border-l-4 border-primary-500 px-5'
				: 'px-6'}"
		>
			<svelte:fragment slot="lead"><Box /></svelte:fragment>
			<svelte:fragment slot="summary">Banner</svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="/add-banner"
					class="btn {$page.url.pathname === '/add-banner'
						? 'text-primary-500'
						: ''} hover:font-semibold">Add Banner</a
				><a
					href="/banner-list"
					class="btn {$page.url.pathname === '/banner-list'
						? 'text-primary-500'
						: ''} hover:font-semibold">Banner List</a
				>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<svelte:fragment slot="trail">
		<LightSwitch />

		<span class="divider-vertical h-full" />
		{#if $isStaffLoggedInStore}
			<button type="button" class="btn btn-sm" on:click={() => logoutStaff()}>
				<span><Logout /></span>
				<span>Logout</span>
			</button>
		{:else}
			<a href="/login" class="btn btn-sm">
				<span><Login /></span>
				<span>Login</span>
			</a>
		{/if}
	</svelte:fragment>
</AppRail>
