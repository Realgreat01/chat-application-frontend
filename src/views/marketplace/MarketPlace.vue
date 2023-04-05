<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-gray-900 transition delay-150 ease-in-out">
		<h2 class="sticky top-0 z-50 bg-brand p-8 text-6xl font-bold">
			Market Place
		</h2>
		<div
			class="scroll my-20 flex w-full flex-wrap items-center justify-center gap-8">
			<div
				class="product relative flex h-[140px] w-2/5 md:h-[200px] md:w-[45%]"
				v-for="(market, index) in MarketPlace"
				:key="index">
				<img
					:src="`/images/market/${market.image}`"
					class="product-image z-40 h-full w-full rounded-xl bg-brand-dark object-cover hover:z-10 hover:bg-gray-800"
					alt="" />
				<div
					class="product-title absolute left-1/2 top-1/2 z-30 mx-auto w-2/3 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-bold text-white hover:z-50 md:text-4xl">
					{{ market.title }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const MarketPlace = ref([
	{ title: 'Gadgets and Devices', route: 'gadgets', image: 'gadgets.png' },
	{ title: 'Real Estates', route: 'estates', image: 'real-estates.png' },
	{ title: 'NFT Market Place', route: 'nfts', image: 'nfts.png' },
	{ title: 'Commodities', route: 'commodities', image: 'e-commerce.png' },
]);
</script>

<style lang="scss" scoped>
.product-title {
	display: none;
}
.product {
	&:hover {
		.product-title {
			display: block;
		}
	}
}
</style>
