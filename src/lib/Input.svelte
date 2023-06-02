<script lang="ts">
	export let type:string = 'text';
	export let label:string;
	export let value:string;

	function typeAction(node:any) {
		node.type = type;
	}
</script>

<div class="space-y-1">
	<label>{label}</label>

	<input use:typeAction bind:value class="rounded-md w-full" />

	<p class="text-sm text-red-600">errors</p>
</div>
