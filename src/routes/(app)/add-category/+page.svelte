<script lang="ts">
	import { triggerToast } from '$lib/utils/toast';
	import { refreshTokenUser } from '$lib/utils/refreshToken';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import Search from '$lib/Icons/Search.svelte';
	import { fade } from 'svelte/transition';
	import Trash from '$lib/Icons/Trash.svelte';

	let paginator = {
		offset: 0,
		limit: 5,
		size: 0,
		amounts: [5, 25, 50, 100]
	};
	let allCategory: any = [];
	let selectedCategoryID: any = [];
	let paginatedSource: any = [];
	let categorySearch: string;
	let categoryData: Category = {
		name: '',
		description: '',
		homepage_visibility: false
	};

	$: {
		if (categorySearch) {
			paginatedSource = allCategory.filter((category: any) => {
				return category.name.toLowerCase().includes(categorySearch.toLowerCase());
			});
			paginator.size = paginatedSource.length;
			paginatedSource = paginatedSource.slice(
				paginator.offset * paginator.limit,
				paginator.offset * paginator.limit + paginator.limit
			);
		} else {
			paginator.size = allCategory.length;
			paginatedSource = allCategory.slice(
				paginator.offset * paginator.limit,
				paginator.offset * paginator.limit + paginator.limit
			);
		}
	}

	const handleSubmitCategory = async () => {
		await refreshTokenUser();
		const response = await fetch('/api/v1/staff/dashboard/inventory/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(categoryData)
		});
		if (response.ok) {
			// reset form
			categoryData = {
				name: '',
				description: '',
				homepage_visibility: false
			};
			await getAllCategory();
			triggerToast('Category added successfully', 'success');
		} else if (!response.ok) {
			triggerToast(response.statusText, 'error');
		}
	};

	const getAllCategory = async () => {
		const response = await fetch('/api/v1/staff/dashboard/inventory/category', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			allCategory = data;
			paginatedSource = data.slice(
				paginator.offset * paginator.limit, // start
				paginator.offset * paginator.limit + paginator.limit // end
			);
		} else if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/staff/dashboard/inventory/category', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const data = await response.json();
				allCategory = data;
				paginatedSource = data.slice(
					paginator.offset * paginator.limit, // start
					paginator.offset * paginator.limit + paginator.limit // end
				);
			} else if (!response.ok) {
				triggerToast(response.statusText, 'error');
			}
		} else if (!response.ok) {
			triggerToast(response.statusText, 'error');
		}
	};
	async function updateCategoryVisibility(id: string, visibility: boolean, name: string) {
		const response = await fetch('/api/v1/staff/dashboard/inventory/category', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				homepage_visibility: visibility
			})
		});
		if (response.ok) {
			triggerToast(`${name} visibility updated`, 'success');
		} else if (response.status === 401) {
			await refreshTokenUser();
			const response = await fetch('/api/v1/staff/dashboard/inventory/category', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id,
					homepage_visibility: visibility
				})
			});
			if (response.ok) {
				triggerToast(`${name} visibility updated`, 'success');
			} else if (!response.ok) {
				triggerToast(response.statusText, 'error');
			}
		} else if (!response.ok) {
			triggerToast(response.statusText, 'error');
		}
	}
	function handleCheck(event: any, id: string) {
		if (event.target.checked) {
			selectedCategoryID = [...selectedCategoryID, id];
		} else {
			selectedCategoryID = selectedCategoryID.filter((item: any) => item !== id);
		}
	}
	interface Checkbox {
		id: string;
		node: HTMLInputElement;
	}

	let checkboxes: Checkbox[] = [];

	$: {
		checkboxes.forEach((checkbox) => {
			checkbox.node.checked = selectedCategoryID.includes(checkbox.id);
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
	const handleDeleteCategory = async () => {
		for (const id of selectedCategoryID) {
			const deleteProduct = async () => {
				const response = await fetch(`/api/v1/staff/dashboard/inventory/category?id=${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.status === 401) {
					await refreshTokenUser();
					const response = await fetch(`/api/v1/staff/dashboard/inventory/category?id=${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});
				} else if (response.ok) {
					triggerToast('Category deleted successfully', 'success');
				} else if (!response.ok) {
					triggerToast(response.statusText, 'error');
				}
			};
			deleteProduct();
		}
		await getAllCategory();
		await selectedCategoryID.forEach((id: string) => {
			allCategory = allCategory.filter((product: any) => product.id !== id);
		});
		selectedCategoryID = [];
	};
</script>

<svelte:head>
	<title>Add Category | OpenMerce</title>
</svelte:head>

<div class="space-y-6">
	<div class="font-bold text-3xl">Category</div>
	<form on:submit|preventDefault={() => handleSubmitCategory()}>
		<div class="space-y-6">
			<section class="card p-8 shadow-xl">
				<p class="font-semibold text-xl">Add Category</p>
				<div class="h-8" />

				<p class="font-semibold text-lg">
					Category Name &nbsp;<span class="badge variant-ghost">Required</span>
				</p>
				<div class=" text-sm">The name of your new category</div>
				<div class="h-4" />

				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">opc-ap1.invisiq.com/category/</div>
					<input
						type="text"
						class="input"
						placeholder="Category Name"
						bind:value={categoryData.name}
					/>
				</div>

				<div class="h-16" />

				<p class="font-semibold text-lg">
					Category Description &nbsp;<span class="badge variant-ghost">Required</span>
				</p>
				<div class="h-4" />
				<label class="label">
					<textarea
						class="textarea overflow-y-auto resize-none"
						rows="7"
						bind:value={categoryData.description}
					/>
					<p class="mt-2 text-sm">
						Write your product description minimum 50 characters to make it easier for buyers to
						understand the category.
					</p>
				</label>
				<div class="h-16" />
				<p class="font-semibold text-lg">Category Visibility</p>
				<div class="h-4" />
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<SlideToggle name="slider-label" bind:checked={categoryData.homepage_visibility}
						>Category and all of it's product(s) {categoryData.homepage_visibility
							? 'will be '
							: "won't be displayed"} displayed</SlideToggle
					>
					<div class="mt-2 text-sm">
						If you choose to display the category, the category and it's product will be displayed
						on the homepage of the web.

						<div class="h-4" />
						Visibility can be&nbsp;<span class="font-bold">changed</span>&nbsp;later.
					</div>
				</label>
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
						>Add Category</button
					>
				</div>
			</footer>
		</div>
	</form>
	<div>
		<label class="label card p-4">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-1/2">
				<div class="input-group-shim"><Search /></div>
				<input type="search" placeholder="Search product..." bind:value={categorySearch} />
			</div>
			<span class="text-xs">Product ID and Name is acceptable</span>
		</label>
		<div class="h-4" />
		<div class="table-container">
			<table class="table table-hover w-full rounded-lg bg-inherit p-6">
				<thead>
					<tr>
						<th />
						<th>ID</th>
						<th>Name</th>
						<th>Visibility</th>
					</tr>
				</thead>
				<tbody>
					{#await getAllCategory()}
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
								<td>
									<SlideToggle
										name="slider"
										bind:checked={item.homepage_visibility}
										size="sm"
										active="bg-primary-500"
										on:change={() =>
											updateCategoryVisibility(item.id, item.homepage_visibility, item.name)}
									/></td
								>
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
</div>
{#if selectedCategoryID.length > 0}
	<div
		class="card shadow-lg fixed bottom-5 right-5 w-full max-w-sm h-64"
		transition:fade={{ duration: 200 }}
	>
		<header class="card-header font-bold text-xl">Selected Products</header>
		<section class="px-4 flex flex-col gap-y-1 overflow-y-auto h-40 items-start">
			{#each selectedCategoryID as item}
				<div class="badge variant-filled">{item}</div>
			{/each}
		</section>
		<footer class="card-footer flex gap-2">
			<button
				type="button"
				class="btn btn-sm w-full variant-ringed shadow-md flex-1"
				on:click={() => {
					selectedCategoryID = [];
				}}
			>
				<span>Cancel</span>
			</button>
			<button
				type="button"
				class="btn btn-sm w-full variant-filled-error shadow-md shadow-error-500/50 flex-1"
				on:click={() => handleDeleteCategory()}
			>
				<span class=" text-white"><Trash /></span>
				<span class=" text-white">Delete Selected</span>
			</button>
		</footer>
	</div>
{/if}
