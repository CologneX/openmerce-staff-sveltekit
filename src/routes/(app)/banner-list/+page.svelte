<script lang="ts">
	import Trash from '$lib/Icons/Trash.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { triggerToast } from '$lib/utils/toast';
	import { onMount } from 'svelte';
	let bannerData: any = [];
	const getBanner = async () => {
		const response = await fetch('/api/v1/home-banner', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		bannerData = data;
		return bannerData;
	};
	onMount(async () => {
		getBanner();
	});
	const handleDeleteBanner = async (bannerID: string) => {
		await refreshTokenUser();
		const response = await fetch(`/api/v1/staff/dashboard/system/home-banner`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: bannerID
			})
		});
		if (response.ok) {
			await getBanner();
			triggerToast(`Banner ${bannerID} has been deleted`, 'success');
		}
	};
</script>

<svelte:head>
	<title>Banner List | OpenMerce</title>
</svelte:head>

<div>
	<div class="font-bold text-3xl">Banner List</div>
	<div class="h-6" />

	<div class="space-y-6">
		<section>
			{#await bannerData}
				<div class="placeholder animate-pulse aspect-[21/5] w-full h-full" />
			{:then data}
				<div class="space-y-8">
					{#each data as image}
						<div class="relative group">
							<img
								src="/usercontent/{image.image_url}"
								alt="{image.image_url}'s image"
								class="object-cover aspect-[21/5] w-full h-full rounded-md shadow-2xl"
							/>
							<div
								class="card absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold py-1 px-3"
							>
								{image.href}
							</div>
							<button
								type="button"
								class="btn btn-sm variant-filled-error absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								on:click={() => handleDeleteBanner(image.id)}
							>
								<span class="text-white"><Trash /></span>
								<span class="font-semibold text-white">Delete</span>
							</button>
						</div>
					{/each}
				</div>
			{/await}
		</section>
	</div>
</div>
