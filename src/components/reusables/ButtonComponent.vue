<template>
	<!-- Add customClass Prop -->
	<button
		class="m-0 flex h-full w-full items-center justify-center rounded-[inherit] border-inherit bg-inherit ring-inherit"
		:type="type"
		:style="style"
		:class="customClass"
		:disabled="loading">
		<div
			v-if="loading === false"
			@click="$emit('click')"
			class="block rounded px-4 py-1 font-bold">
			{{ text }}
		</div>
		<div
			v-else
			class="flex h-full w-full cursor-not-allowed items-center justify-between rounded bg-gray-700">
			<div class="mx-auto flex w-2/3 items-center justify-between px-4">
				<p class="">{{ loadingText }}</p>
				<img
					:src="LoadingIcon"
					alt="" />
			</div>
		</div>
	</button>
</template>

<script setup>
import LoadingIcon from '../icons/svgs/loading-icon.svg';
defineProps({
	type: {
		type: String,
		default: 'button',
	},
	text: {
		type: String,
		default: 'Log In',
	},
	loadingText: {
		type: String,
		default: 'Loading . . . ',
	},
	loading: {
		type: Boolean,
		default: false,
	},
	customClass: {
		type: String,
		default: 'font-normal',
	},
	style: {
		type: Object,
	},
});
</script>

<style scoped></style>
