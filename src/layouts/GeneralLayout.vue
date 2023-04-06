<template>
	<div
		class="scroll relative mx-auto flex h-screen flex-col overflow-y-scroll bg-brand-dark md:w-1/3">
		<RouterView />
		<div
			class="fixed bottom-0 z-[100] mx-auto flex w-full bg-slate-800 md:w-1/3"
			v-if="state.showFooter">
			<RouterLink
				:to="{ name: footer.route }"
				class="m-1 flex h-[5.5rem] w-full flex-col items-center justify-center"
				v-for="(footer, index) in footerRoutes"
				:key="index">
				<div
					class="route-icon flex h-full w-full items-center justify-center p-4">
					<component
						:is="footer.icon"
						class="block h-full w-10 fill-white" />
				</div>

				<h2 class="route-name hidden text-lg capitalize text-gray-300">
					{{ footer.name }}
				</h2>
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
import { ConversationStore } from '../stores/conversation-details';
// import { ArrowTrendingUpIcon } from '@heroicons/vue/24/outline';
import TrendingIcon from './TrendingIcon.vue';
const state = ConversationStore();
const footerRoutes = shallowRef([
	{ name: 'home', route: 'app', icon: RiHome7Line },
	{ name: 'trends', route: 'trends', icon: TrendingIcon },
	{ name: 'market place', route: 'market-place', icon: RiStore2Line },
	{ name: 'events', route: 'events', icon: RiCalendar2Line },
	{ name: 'settings', route: 'settings', icon: RiSettings2Line },
]);
</script>

<style lang="scss">
.router-link-active {
	.route-icon {
		@apply -translate-y-3 rounded-2xl bg-brand duration-500;
	}
	.route-name {
		@apply block;
	}
}
</style>
