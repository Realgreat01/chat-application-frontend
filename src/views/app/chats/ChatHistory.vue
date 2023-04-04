<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-brand-dark transition delay-150 ease-in-out">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<h2 class="my-10 text-6xl font-black">{{ activeComponent.title }}</h2>
			<RouterLink
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
			</RouterLink>
		</div>
		<div class="h-full overflow-y-scroll pt-[11rem]">
			<div
				class="sticky top-[0rem] z-40 flex w-full items-center justify-around bg-gray-900 py-3">
				<div
					class=""
					v-for="(component, index) in DashboardComponent"
					@click="(activeComponent = component), (state.homeTab = index)"
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
			<component :is="activeComponent.component" />
		</div>
	</div>
</template>

<script setup>
import ChatHistoryComponent from '@/components/chats/ChatHistoryComponent.vue';
import CommunityComponent from '@/components/chats/CommunityComponent.vue';
import NewsfeedComponent from '@/components/posts/NewsfeedComponent.vue';
import { ConversationStore } from '@/stores/conversation-details.js';
import { useSwipe } from '@vueuse/core';
import {
	NewspaperIcon,
	UserGroupIcon,
	ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/solid';

import { RiArticleLine } from 'vue-remix-icons';
import { shallowRef, ref } from 'vue';
import { socket } from '@/socket.io';

const state = ConversationStore();
const DashboardComponent = shallowRef([
	{
		component: NewsfeedComponent,
		title: 'News Feed',
		icon: NewspaperIcon,
	},
	{
		component: ChatHistoryComponent,
		title: 'Chats History',
		icon: ChatBubbleLeftRightIcon,
	},
	{
		component: CommunityComponent,
		title: 'Community',
		icon: UserGroupIcon,
	},
]);
const activeComponent = shallowRef(DashboardComponent.value[state.homeTab]);

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
