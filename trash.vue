<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out md:w-1/3">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<div class="flex h-full flex-col items-start justify-center">
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
			<div class="">
				<div
					class=""
					v-for="(component, index) in DashboardComponent"
					@click="activeComponent = component"
					:key="index"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import ChatHistoryComponent from '@/components/chats/ChatHistoryComponent.vue';
import { ConversationStore } from '@/stores/conversation-details.js';
import { ref } from 'vue';
import { socket } from '@/socket.io';

const state = ConversationStore();
(async function () {
	if (socket.connected) {
		const user = await state.getCurrentUser();
		state.getChatHistory();
		state.getAllUsers();
		socket.emit('get-current-state', user._id);
	} else {
		socket.connect();
		const user = await state.getCurrentUser();
		socket.emit('connected-user', user._id);
		state.getCurrentUser();
		state.getChatHistory();
		state.getAllUsers();
		socket.emit('get-current-state', user._id);
	}
})();

const DashboardComponent = ref([
	{
		component: ChatHistoryComponent,
		title: 'Chats History',
		icon: 'message',
	},
]);
const activeComponent = ref(DashboardComponent.value[0]);
</script>

<style lang="scss" scoped></style>
