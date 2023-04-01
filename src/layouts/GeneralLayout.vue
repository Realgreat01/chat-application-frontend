<template>
	<div
		class="relative mx-auto flex h-screen flex-col border border-gray-700 bg-brand-dark md:w-1/3">
		<RouterView />
		<div class="fixed bottom-0 mx-auto flex w-full bg-slate-800 p-4 md:w-1/3">
			<RouterLink
				:to="{ name: footer.name }"
				class="flex w-full items-center justify-center"
				v-for="(footer, index) in footerRoutes">
				<component
					:is="footer.icon"
					class="block w-10 fill-white text-white" />
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { shallowRef } from 'vue';
import {
	RiHome7Line,
	RiStore2Line,
	RiSettings2Line,
	RiCalendar2Line,
} from 'vue-remix-icons';
import { ArrowTrendingUpIcon } from '@heroicons/vue/24/outline';
import TrendingIcon from './TrendingIcon.vue';
const footerRoutes = shallowRef([
	{ name: 'all-chats', route: 'home', icon: RiHome7Line },
	{ name: '', route: 'trends', icon: TrendingIcon },
	{ name: '', route: 'market-place', icon: RiStore2Line },
	{ name: '', route: 'events', icon: RiCalendar2Line },
	{ name: '', route: 'settings', icon: RiSettings2Line },
]);
</script>
