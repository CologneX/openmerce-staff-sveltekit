<script lang="ts">
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Logo from '$lib/Icons/Logo.svelte';
	import { isStaffLoggedInStore } from '$lib/utils/stores';
	import { triggerToast } from '$lib/utils/toast';
	let username: string;
	let password: string;
	let isLoggingIn: boolean = false;
	const handleStaffLogin = async () => {
		isLoggingIn = true;
		type = 'text';
		const response = await fetch('/api/v1/staff/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		});
		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('fin_user', data.fin_user);
			localStorage.setItem('inv_user', data.inv_user);
			localStorage.setItem('sys_admin', data.sys_admin);
			localStorage.setItem('username', data.username);
			isStaffLoggedInStore.set(true);
			triggerToast(`Welcome back, ${data.username}!`, 'variant-filled-success');
			await goto('/');
		} else if (response.status === 401) {
			triggerToast(`Invalid credentials`, 'error');
		} else if (response.status === 500) {
			triggerToast(`Server Error`, 'error');
		} else {
			triggerToast(response.statusText, 'error');
		}
		isLoggingIn = false;
	};
	let type: string = 'password';

	function typeAction(node: any) {
		node.type = type;
	}
</script>

<svelte:head>
	<title>Staff Login | OpenMerce</title>
</svelte:head>
<div class="flex flex-col items-center h-full">
	<div class="flex justify-center py-14"><Logo height="8" /></div>
	<div class="card py-10 h-full max-h-96 w-full max-w-xs shadow-xl">
		<header class="card-header text-3xl font-bold">Staff Login</header>
		<form on:submit|preventDefault={handleStaffLogin}>
			<section class="p-4 flex flex-col gap-y-2">
				<label class="label font-semibold">
					<span>Username</span>
					<input type="text" class="input" bind:value={username} />
				</label>
				<label class="label font-semibold">
					<span>Password</span>
					<input use:typeAction class="input" bind:value={password} />
				</label>
			</section>
			<footer class="card-footer text-center space-y-3">
				<button type="submit" class="btn variant-ghost-primary w-full" disabled={isLoggingIn}
					><span
						>{#if isLoggingIn}<ProgressRadial class="w-6" />{/if}</span
					>
					<span>{isLoggingIn ? 'Logging In ...' : 'Log In'}</span></button
				>
				<hr class="!border-t-2" />
				<small>
					Need help?
					<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="anchor no-underline">
						Contact OpenMerce Help</a
					>
				</small>
			</footer>
		</form>
	</div>
</div>
