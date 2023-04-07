<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-gray-900 transition delay-150 ease-in-out">
		<h2 class="sticky top-0 z-50 rounded-xl bg-brand p-8 text-6xl font-bold">
			Trends
		</h2>
		<TrendingStocks/>
	</div>
</template>

<script setup>
import { shallowRef } from 'vue';
import TrendingStocks from "./components/TrendingStocks.vue"
</script>

<style lang="scss" scoped></style>
