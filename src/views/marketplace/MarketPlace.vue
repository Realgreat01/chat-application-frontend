<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-gray-900 transition delay-150 ease-in-out">
		<h2 class="sticky top-0 z-50 rounded-xl bg-brand p-8 text-6xl font-bold">
			Market Place
		</h2>
		<h2 class="sticky top-0 z-50 mt-6 flex items-center justify-between px-5">
			<h2 class="text-3xl font-black"></h2>
			<button class="rounded-lg bg-brand px-4 py-2 text-brand-dark">
				Create A Store
			</button>
		</h2>
		<div
			class="scroll my-20 flex w-full flex-wrap items-center justify-center gap-8">
			<div
				class="product relative flex h-[140px] w-2/5 cursor-pointer flex-col items-center justify-center rounded-xl bg-brand-dark"
				v-for="(market, index) in MarketPlace"
				:key="index">
				<!-- :src="`/images/market/${market.image}`" -->
				<component
					:is="market.icon"
					class="product-image mb-4 h-20 w-40 text-4xl font-thin text-brand">
				</component>
				<div
					class="product-title mx-auto w-2/3 text-center text-2xl font-medium text-gray-300">
					{{ market.title }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

import {
	BanknotesIcon,
	BuildingOffice2Icon,
	ComputerDesktopIcon,
	BuildingStorefrontIcon,
} from '@heroicons/vue/24/outline';

const MarketPlace = ref([
	{ title: 'Gadgets and Devices', route: 'gadgets', icon: ComputerDesktopIcon },
	{ title: 'Real Estates', route: 'estates', icon: BuildingOffice2Icon },
	{ title: 'NFT Market Place', route: 'nfts', icon: BanknotesIcon },
	{ title: 'Commodities', route: 'commodities', icon: BuildingStorefrontIcon },
]);
</script>

<style lang="scss" scoped>
// .product-title {
// 	display: none;
// }
.product {
	&:hover {
		@apply bg-gray-950;
		.product-image {
			@apply text-gray-500;
		}
	}
}
</style>
