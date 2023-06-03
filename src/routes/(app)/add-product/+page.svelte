<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { triggerToast } from '$lib/utils/toast';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { goto } from '$app/navigation';

	let categorySelectSearch: string = '';

	let popupCategorySelectSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	function onFlavorSelection(event: any): void {
		productDetails.category_id = parseInt(event.detail.value);
		categorySelectSearch = event.detail.label;
	}

	const fetchCategories = async () => {
		const response = await fetch('/api/v1/category');
		const data = await response.json();

		categoriesOptions = data.map((category: any) => ({
			label: category.name,
			value: category.id
		}));
	};
	onMount(() => {
		fetchCategories();
	});
	let categoriesOptions: AutocompleteOption[] = [];

	let productDetails: Product = {
		category_id: null,
		name: null,
		description: null,
		price: null,
		weight: null,
		initial_stock: null,
		length: null,
		width: null,
		height: null
	};
	let image: (FileList | null)[] = [null, null, null, null, null];
	const handleSubmitProduct = async () => {
		await refreshTokenUser();
		const response = await fetch('/api/v1/staff/dashboard/inventory/product-1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_id: Number(productDetails.category_id),
				name: productDetails.name,
				description: productDetails.description,
				price: Number(productDetails.price),
				weight: Number(productDetails.weight),
				initial_stock: Number(productDetails.initial_stock),
				length: Number(productDetails.length),
				width: Number(productDetails.width),
				height: Number(productDetails.height)
			})
		});
		if (response.ok) {
			const productID = await response.json();
			for (const images of image) {
				const formData = new FormData();
				formData.append('product_id', productID.id);
				if (images?.item(0)) {
					formData.append('picture', images.item(0) as File);
					const responseImage = await fetch('/api/v1/staff/dashboard/inventory/product-2', {
						method: 'POST',
						body: formData
					});
				}
			}
			triggerToast('Product added successfully!', 'success');
			goto(history.state.from || '/product-list');
		}
	};
</script>

<svelte:head>
	<title>Add Product | OpenMerce</title>
</svelte:head>

<div>
	<div class="font-bold text-3xl">Add Product</div>
	<div class="h-6" />
	<form on:submit|preventDefault={() => handleSubmitProduct()}>
		<div class="space-y-6">
			<section class="card p-8 shadow-xl">
				<p class="font-semibold text-xl">Product Information</p>
				<div class="h-8" />
				<table class=" w-full table-auto">
					<tbody>
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Product Name &nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class=" text-sm">
									Product name min. 40 characters by entering brand, product type, color, material
									or type.
									<div class="h-6" />
									It is recommended not to use excess capital letters, enter more than 1 brand, and promotional
									words.
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<label class="label">
									<input
										type="text"
										class="input"
										bind:value={productDetails.name}
										placeholder="Name..."
										required
									/>
									<p class="mt-2 text-sm">
										Tips: Product Type + Product Brand + Additional Information
									</p>
								</label>
							</td>
						</tr>
						<div class="h-16" />
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Category &nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class="text-sm">
									Choose the appropriate category because service fees will depend on the category.
									If the category selection is not appropriate, the category will be changed by
									OpenMerce.
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<label class="label">
									<input
										class="input autocomplete"
										type="search"
										name="autocomplete-search"
										bind:value={categorySelectSearch}
										placeholder="Search..."
										autocomplete="off"
										use:popup={popupCategorySelectSettings}
										required
									/>
									<div
										data-popup="popupAutocomplete"
										class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto shadow-xl"
									>
										<Autocomplete
											bind:input={categorySelectSearch}
											options={categoriesOptions}
											on:selection={onFlavorSelection}
										/>
									</div>

									<p class="mt-2 text-sm">Tips: Choose the best category for your product</p>
								</label>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="card p-8 shadow-xl">
				<p class="font-semibold text-xl">Product Details</p>
				<div class="h-8" />
				<table class=" w-full table-auto">
					<tbody>
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Product Images &nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class=" text-sm">
									Image formats accepted are only .jpg .jpeg .png .webp and a minimum size of 300 x
									300px (For optimal images use a minimum size of 700 x 700 px).
									<div class="h-6" />
									Select product photos or drag and drop up to 5 photos at once here. Upload min. 3 photos
									that are attractive and different from each other to attract the attention of buyers.
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<div class="flex flex-cols flex-wrap gap-4">
									{#each [0, 1, 2, 3, 4] as _, i}
										<FileDropzone
											name="image"
											class="w-36 h-full aspect-square object-contain rounded-md"
											bind:files={image[i]}
											accept="image/*"
										>
											<svelte:fragment slot="message">Photo {i + 1}</svelte:fragment>
											<svelte:fragment slot="meta">
												{#if image[i]}
													{image[i].item(0)?.name}
												{:else}
													.png .jpg .webp .jpeg
												{/if}
											</svelte:fragment>
										</FileDropzone>
									{/each}
								</div>
							</td>
						</tr>
						<div class="h-16" />
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">Product Description</p>
								<div class="h-4" />
								<div class=" text-sm">
									Make sure the product description contains a detailed explanation regarding your
									product so that buyers can easily understand and find your product.
									<div class="h-6" />
									It is recommended not to enter &nbsp;<span class="font-bold">
										Phone number, e-mail, etc.
									</span> into product descriptions to protect your personal data.
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<label class="label">
									<textarea
										class="textarea overflow-y-auto resize-none"
										rows="7"
										bind:value={productDetails.description}
									/>
									<p class="mt-2 text-sm">
										Write your product description minimum 260 characters to make it easier for
										buyers to understand.
									</p>
								</label>
							</td>
						</tr>
						<div class="h-16" />
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Price&nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class=" text-sm">
									Enter the price of your product in <span class="font-bold">Rupiah</span>
									<div class="h-6" />
									Make sure your price is reasonable and competitive with other sellers.
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
									<div class="input-group-shim font-bold">Rp</div>
									<input
										type="text"
										placeholder="Enter price..."
										required
										bind:value={productDetails.price}
										on:keypress={(e) => {
											if (e.key.match(/[^0-9]/g)) {
												e.preventDefault();
											}
										}}
									/>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="card p-8 shadow-xl">
				<p class="font-semibold text-xl">Stock, Weight & Shipping</p>
				<div class="h-8" />
				<table class=" w-full table-auto">
					<tbody>
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Product Stock &nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class=" text-sm">Please enter the actual stock of your product</div>
							</td>
							<td class="w-1/5" />
							<td>
								<label class="label">
									<input
										type="text"
										class="input"
										placeholder="Enter stock..."
										required
										bind:value={productDetails.initial_stock}
										on:keypress={(e) => {
											if (e.key.match(/[^0-9]/g)) {
												e.preventDefault();
											}
										}}
									/>
								</label>
							</td>
						</tr>
						<div class="h-16" />
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Product Weight &nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class=" text-sm">
									Input weight by weighing product <span class="font-bold"> after packing. </span>
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<label class="label">
									<div class="input-group input-group-divider grid-cols-[1fr_auto_auto]">
										<input
											type="text"
											placeholder="Enter weight..."
											required
											bind:value={productDetails.weight}
											on:keypress={(e) => {
												if (e.key.match(/[^0-9]/g)) {
													e.preventDefault();
												}
											}}
										/>
										<div class="input-group-shim font-bold">Kg</div>
									</div>
									<p class="mt-2 text-sm">
										Enter the actual weight of your product in kilograms. Note you have to be
										precise to minimize the risk of shipping errors.
									</p>
								</label>
							</td>
						</tr>
						<div class="h-16" />
						<tr>
							<td class="w-1/5">
								<p class="font-semibold text-lg">
									Product Dimensions &nbsp;<span class="badge variant-ghost">Required</span>
								</p>
								<div class="h-4" />
								<div class=" text-sm">
									Enter the dimensions of your product in <span class="font-bold">centimeter</span>
								</div>
							</td>
							<td class="w-1/5" />
							<td>
								<div class="flex flex-cols flex-wrap gap-4">
									<div class="input-group input-group-divider grid-cols-[1fr_auto_auto] w-48 grow">
										<input
											type="text"
											placeholder="Height"
											maxlength="6"
											required
											bind:value={productDetails.height}
											on:keypress={(e) => {
												if (e.key.match(/[^0-9]/g)) {
													e.preventDefault();
												}
											}}
										/>
										<div class="input-group-shim">cm</div>
									</div>
									<div class="input-group input-group-divider grid-cols-[1fr_auto_auto] w-48 grow">
										<input
											type="text"
											placeholder="Length"
											maxlength="6"
											required
											bind:value={productDetails.length}
											on:keypress={(e) => {
												if (e.key.match(/[^0-9]/g)) {
													e.preventDefault();
												}
											}}
										/>
										<div class="input-group-shim">cm</div>
									</div>
									<div class="input-group input-group-divider grid-cols-[1fr_auto_auto] w-48 grow">
										<input
											type="text"
											placeholder="Width"
											maxlength="6"
											required
											bind:value={productDetails.width}
											on:keypress={(e) => {
												if (e.key.match(/[^0-9]/g)) {
													e.preventDefault();
												}
											}}
										/>
										<div class="input-group-shim">cm</div>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<footer class="grid grid-cols-2">
				<div />
				<div class="flex gap-x-6">
					<button
						type="button"
						class="btn variant-ringed-primary font-semibold text-white flex-1"
						on:click={() => history.back()}>Cancel</button
					>
					<button type="submit" class="btn variant-filled-primary font-semibold text-white flex-1"
						>Add Product</button
					>
				</div>
			</footer>
		</div>
	</form>
</div>
