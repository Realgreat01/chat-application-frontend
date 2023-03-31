<template>
	<div>This is news feed</div>
	<router-link
		:to="{ name: 'all-users' }"
		style="font-size: 30px"
		class="fixed bottom-10 mx-auto flex h-fit w-full items-center md:w-1/3">
		<span class="material-icons absolute right-10 self-end p-5">
			<PencilSquareIcon class="w-12" />
		</span>
	</router-link>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
</script>

<style lang="scss" scoped></style>
