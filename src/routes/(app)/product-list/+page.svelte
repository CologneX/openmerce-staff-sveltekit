<script lang="ts">
	import { goto } from '$app/navigation';
	import Edit from '$lib/Icons/Edit.svelte';
	import Search from '$lib/Icons/Search.svelte';
	import Trash from '$lib/Icons/Trash.svelte';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	let dataProducts: any = [];
	let selectedProductsID: any = [];
	let productSearch: string;
	let paginator = {
		offset: 0,
		limit: 5,
		size: 0,
		amounts: [5, 25, 50, 100]
	};
	let paginatedSource: any = [];
	const getProduct = async () => {
		const response = await fetch('/api/v1/product', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		dataProducts = data.reduce((acc: any[], category: any) => {
			if (category.products) {
				return [...acc, ...category.products];
			} else {
				return acc;
			}
		}, []);
		paginatedSource = dataProducts.slice(
			paginator.offset * paginator.limit, // start
			paginator.offset * paginator.limit + paginator.limit // end
		);
	};
	// filter product by name
	$: {
		if (productSearch) {
			const searchQuery = productSearch.toLowerCase();
			paginatedSource = dataProducts.filter((product: any) => {
				return (
					product.name.toLowerCase().includes(searchQuery) ||
					product.id.toLowerCase().includes(searchQuery)
				);
			});
			paginator.size = dataProducts.length;
			paginatedSource = dataProducts.slice(
				paginator.offset * paginator.limit,
				paginator.offset * paginator.limit + paginator.limit
			);
		} else {
			paginator.size = dataProducts.length;
			paginatedSource = dataProducts.slice(
				paginator.offset * paginator.limit,
				paginator.offset * paginator.limit + paginator.limit
			);
		}
	}

	const handleEditProduct = (productID: string) => {
		goto(`edit-product/${productID}`);
	};

	const handleDeleteProduct = async () => {
		for (const id of selectedProductsID) {
			const deleteProduct = async () => {
				const response = await fetch(`/api/v1/staff/dashboard/inventory/product?id=${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.status === 401) {
					await refreshTokenUser();
					const response = await fetch(`/api/v1/staff/dashboard/inventory/product?id=${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});
				}
			};
			deleteProduct();
		}
		await selectedProductsID.forEach((id: string) => {
			dataProducts = dataProducts.filter((product: any) => product.id !== id);
		});
		await getProduct();
		selectedProductsID = [];
	};

	function handleCheck(event: any, id: string) {
		if (event.target.checked) {
			selectedProductsID = [...selectedProductsID, id];
		} else {
			selectedProductsID = selectedProductsID.filter((item: any) => item !== id);
		}
	}
	interface Checkbox {
		id: string;
		node: HTMLInputElement;
	}

	let checkboxes: Checkbox[] = [];

	$: {
		checkboxes.forEach((checkbox) => {
			checkbox.node.checked = selectedProductsID.includes(checkbox.id);
		});
	}
	function registerCheckbox(node: HTMLInputElement, { id }: { id: string }) {
		checkboxes = [...checkboxes, { id, node }];
		return {
			destroy() {
				checkboxes = checkboxes.filter((checkbox) => checkbox.id !== id);
			}
		};
	}
</script>

<svelte:head>
	<title>Product List | OpenMerce</title>
</svelte:head>

<div>
	<div class="font-bold text-3xl">Product List</div>
	<div class="h-6" />
	<label class="label">
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-1/2">
			<div class="input-group-shim"><Search /></div>
			<input type="search" placeholder="Search product..." bind:value={productSearch} />
		</div>
		<span class="text-xs">Product ID and Name is acceptable</span>
	</label>

	<div class="h-6" />

	<div class="table-container">
		<table class="table table-hover w-full rounded-lg bg-inherit p-6">
			<thead>
				<tr>
					<th />
					<th>ID</th>
					<th>Name</th>
					<th>Price</th>
					<th>Rating</th>
				</tr>
			</thead>
			<tbody>
				{#await getProduct()}
					<tr class="group">
						<td><input type="checkbox" class="checkbox" /></td>
						<td><p class="placeholder animate-pulse" /></td>
						<td><p class="placeholder animate-pulse" /></td>
						<td><p class="placeholder animate-pulse" /></td>
						<td><p class="placeholder animate-pulse" /> </td>
					</tr>
				{:then}
					{#each paginatedSource as item}
						<tr class="group">
							<td
								><input
									type="checkbox"
									class="checkbox"
									use:registerCheckbox={{ id: item.id }}
									on:change={(event) => handleCheck(event, item.id)}
								/></td
							>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td class="flex justify-around"
								>{item.rating}
								<button
									type="button"
									class="btn btn-sm p-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									on:click={() => handleEditProduct(item.id)}
								>
									<span><Edit /></span></button
								>
							</td>
						</tr>
					{/each}
				{/await}
				<tr>
					<td colspan="5">
						<Paginator bind:settings={paginator} />
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

{#if selectedProductsID.length > 0}
	<div
		class="card shadow-lg fixed bottom-5 right-5 w-full max-w-sm h-64"
		transition:fade={{ duration: 200 }}
	>
		<header class="card-header font-bold text-xl">Selected Products</header>
		<section class="px-4 flex flex-col gap-y-1 overflow-y-auto h-40 items-start">
			{#each selectedProductsID as item}
				<div class="badge variant-filled">{item}</div>
			{/each}
		</section>
		<footer class="card-footer flex gap-2">
			<button
				type="button"
				class="btn btn-sm w-full variant-ringed shadow-md flex-1"
				on:click={() => {
					selectedProductsID = [];
				}}
			>
				<span>Cancel</span>
			</button>
			<button
				type="button"
				class="btn btn-sm w-full variant-filled-error shadow-md shadow-error-500/50 flex-1"
				on:click={() => handleDeleteProduct()}
			>
				<span class=" text-white"><Trash /></span>
				<span class=" text-white">Delete Selected</span>
			</button>
		</footer>
	</div>
{/if}
