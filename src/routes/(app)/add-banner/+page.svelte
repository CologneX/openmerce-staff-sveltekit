<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { triggerToast } from '$lib/utils/toast';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	let image: FileList | null;
	let bannerHref: string | null;
	const handleSubmitBanner = async () => {
		const formData = new FormData();
		formData.append('picture', image?.item(0) as File);
		formData.append('href', `/${bannerHref}`);
		const response = await fetch('/api/v1/staff/dashboard/system/home-banner', {
			method: 'POST',
			body: formData
		});
		if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/staff/dashboard/system/home-banner', {
				method: 'POST',
				body: formData
			});
			if (!response.ok) {
				triggerToast(response.statusText, 'error');
			} else if (response.ok) {
				triggerToast('Banner added successfully', 'success');
				image = null;
				bannerHref = null;
			}
		} else if (response.ok) {
			triggerToast('Banner added successfully', 'success');
			image = null;
			bannerHref = null;
		} else if (!response.ok) {
			triggerToast(response.statusText, 'error');
		}
	};
</script>

<svelte:head>
	<title>Add Banner | OpenMerce</title>
</svelte:head>

<div>
	<div class="font-bold text-3xl">Add Banner</div>
	<div class="h-6" />
	<form on:submit|preventDefault={() => handleSubmitBanner()}>
		<div class="space-y-6">
			<section class="card p-8 shadow-xl">
				<p class="font-semibold text-xl">Banner Information</p>
				<div class="h-8" />

				<p class="font-semibold text-lg">
					Banner Href &nbsp;<span class="badge variant-ghost">Required</span>
				</p>
				<div class=" text-sm">Banner's link</div>
				<div class="h-4" />

				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">opc-ap1.invisiq.com/</div>
					<input type="text" class="input" placeholder="Banner Link" bind:value={bannerHref} />
				</div>

				<div class="h-16" />

				<p class="font-semibold text-lg">
					Banner Image &nbsp;<span class="badge variant-ghost">Required</span>
				</p>
				<div class="h-4" />
				<!-- <svelte:fragment slot="lead"><span><Photo /></span></svelte:fragment> -->
				<FileDropzone name="image" bind:files={image} accept="image/*">
					<svelte:fragment slot="message">Banner Photo</svelte:fragment>
					<svelte:fragment slot="meta">
						{#if image}
							{image.item(0)?.name}
						{:else}
							.png .jpg .webp .jpeg
						{/if}</svelte:fragment
					>
				</FileDropzone>
				<!-- <input class="input" type="file" bind:files={image} /> -->
				<div class="text-sm">
					Image ratio of 21/5 is recommended. Image size must be less than 5MB.
				</div>
			</section>

			<footer class="grid grid-cols-2">
				<div />
				<div class="flex gap-x-6">
					<button
						type="button"
						class="btn variant-ringed-primary font-semibold text-dark flex-1"
						on:click={() => history.back()}>Cancel</button
					>
					<button type="submit" class="btn variant-filled-primary font-semibold text-white flex-1"
						>Add Banner</button
					>
				</div>
			</footer>
		</div>
	</form>
</div>
