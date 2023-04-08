<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-brand-dark transition delay-150 ease-in-out">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[6rem] w-full items-center justify-between rounded-lg bg-brand px-4 md:w-1/3">
			<h2 class="text-4xl font-semibold">
				{{ activeComponent.title }}
			</h2>
		</div>
		<div class="h-full overflow-y-scroll pt-[6rem]">
			<div
				class="sticky top-[0rem] z-40 flex w-full items-center justify-around bg-gray-900 py-3">
				<div
					class=""
					v-for="(component, index) in DashboardComponent"
					@click="
						(activeComponent = component),
							(currentTabIndex = index),
							(state.homeTab = index)
					"
					:key="index">
					<component
						:is="component.icon"
						class="w-14 cursor-pointer"
						:class="
							activeComponent === component
								? 'fill-white text-white'
								: 'fill-gray-700 text-gray-700'
						" />
				</div>
			</div>

			<div ref="swipeContainer">
				<component
					:is="activeComponent.component"
					@touchstart="e => plugin.touchStart(e)"
					@touchmove="e => plugin.touchMove(e)"
					@touchend="e => (scroll = plugin.touchEnd())" />
			</div>
		</div>
	</div>
</template>

<script setup>
import ChatHistoryComponent from '@/components/chats/ChatHistoryComponent.vue';
import CommunityComponent from '@/components/chats/CommunityComponent.vue';
import NewsfeedComponent from '@/components/posts/NewsfeedComponent.vue';
import { ConversationStore } from '@/stores/conversation-details.js';
import { storeToRefs } from 'pinia';

import { useSwipe } from '@vueuse/core';
import { plugin } from '@/plugins';
import {
	NewspaperIcon,
	UserGroupIcon,
	ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/solid';

import { RiArticleLine } from 'vue-remix-icons';
import { shallowRef, ref, watchEffect, watch } from 'vue';
import { socket } from '@/socket.io';

// const store = storeToRefs(ConversationStore());
const state = ConversationStore();
const scroll = ref(null);
const currentTabIndex = ref(0);

const DashboardComponent = shallowRef([
	{
		component: NewsfeedComponent,
		title: 'News Feed',
		icon: RiArticleLine,
	},
	{
		component: ChatHistoryComponent,
		title: 'Chats History',
		icon: ChatBubbleLeftRightIcon,
	},
	{
		component: CommunityComponent,
		title: 'Communities',
		icon: UserGroupIcon,
	},
]);
let activeComponent = shallowRef(DashboardComponent.value[state.homeTab]);

// const scrollTab = ref(0);

// watch(scroll, (oldValue, newValue) => {
// 	if (state.homeTab >= DashboardComponent.value.length - 1 && oldValue > 0) {
// 		console.log('tab highest');
// 		return false;
// 	} else if (state.homeTab === 0 && oldValue < 0) {
// 		console.log('tab 0');
// 		return false;
// 	} else {
// 		console.log({
// 			current: state.homeTab,
// 			scroll: state.homeTab + parseInt(oldValue),
// 		});

// 		if (Boolean(parseInt(oldValue))) {
// 			scrollTab.value = state.homeTab + parseInt(oldValue);
// 			activeComponent = shallowRef(
// 				DashboardComponent.value[state.homeTab + parseInt(oldValue)]
// 			);
// 		}
// 	}
// });

const swipeContainer = ref(null);
const onSwipe = event => {
	// console.log('swiped', event.direction);
	if (
		event.direction === 'left' &&
		state.homeTab < DashboardComponent.value.length - 1
	) {
		state.homeTab.value++;
	} else if (event.direction === 'right' && state.homeTab.value > 0) {
		state.homeTab.value--;
	}
};

const { isSwiping, direction } = useSwipe(swipeContainer);
// console.log(isSwiping, direction);

watchEffect(() => {
	state.currentHomeTab = currentTabIndex.value;
});

(async function () {
	if (socket.connected) {
		const user = await state.getCurrentUser();
		await state.getChatHistory();
		await state.getAllUsers();
		const getStates = setInterval(
			() => socket.emit('get-current-state', user._id),
			50
		);
		setTimeout(() => clearInterval(getStates), 1000);
	} else {
		socket.connect();
		const user = await state.getCurrentUser();
		socket.emit('connected-user', user._id);
		await state.getCurrentUser();
		await state.getChatHistory();
		await state.getAllUsers();
		const getStates = setInterval(
			() => socket.emit('get-current-state', user._id),
			50
		);
		setTimeout(() => clearInterval(getStates), 1000);
	}
})();
</script>

<style lang="scss" scoped></style>
<!-- <RouterLink
				class="flex cursor-pointer flex-col items-center"
				:to="{ name: 'user' }">
				<img
					:src="state.user?.profile_picture"
					class="block h-[4rem] w-[4rem] rounded-full bg-white"
					alt=""
					v-if="state.user?.profile_picture" />
				<p
					class="material-icons"
					style="font-size: 50px"
					v-else>
					account_circle
				</p>
				<p class="font-semi-bold py-2 text-xl text-gray-900">My Profile</p>
			</RouterLink> -->
