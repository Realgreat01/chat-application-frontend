<template>
	<div class="relative mx-auto flex h-screen flex-col bg-brand-dark md:w-1/3">
		<RouterView />
		<div
			class="fixed bottom-0 mx-auto flex w-full bg-slate-800 md:w-1/3"
			v-if="state.showFooter">
			<RouterLink
				:to="{ name: footer.name }"
				class="m-1 flex h-full w-full items-center justify-center p-4"
				v-for="(footer, index) in footerRoutes"
				:key="index">
				<component
					:is="footer.icon"
					class="block h-full w-10 fill-white" />
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
	{ name: 'app', route: 'home', icon: RiHome7Line },
	{ name: 'trends', route: 'trends', icon: TrendingIcon },
	{ name: 'market-place', route: 'market-place', icon: RiStore2Line },
	{ name: 'events', route: 'events', icon: RiCalendar2Line },
	{ name: 'settings', route: 'settings', icon: RiSettings2Line },
]);
</script>

<style lang="scss">
.router-link-exact-active {
	@apply -translate-y-3 rounded-2xl bg-brand duration-500;
}
</style>
