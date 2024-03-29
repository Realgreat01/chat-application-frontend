<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out md:w-1/3">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<h2 class="my-10 text-6xl font-black">Chats History</h2>
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

		<div
			v-if="state.chatHistory.length !== 0"
			class="h-full overflow-y-scroll pt-[11rem]">
			<RouterLink
				:to="{ name: 'private-chat' }"
				@click="state.receiver = user"
				v-for="user in state.chatHistory"
				:key="user._id"
				class="sticky top-0 mx-4 mt-4 flex cursor-pointer items-start rounded-lg border-2 border-transparent border-y-gray-900 bg-gray-900 p-4">
				<div class="relative flex w-fit">
					<img
						:src="user.profile_picture"
						class="block h-[4rem] w-[4rem] rounded-full bg-white"
						alt="" />
					<div class="relative top-0 right-5">
						<span
							style="font-size: 20px"
							v-if="user.is_online"
							class="material-icons text-green-400"
							>fiber_manual_record <span></span>
						</span>
						<span
							style="font-size: 20px"
							v-else
							class="material-icons text-gray-600"
							>fiber_manual_record</span
						>
					</div>
				</div>
				<div class="m-2 mx-4">
					<h2 class="text-2xl font-bold">
						{{ user.firstname }} {{ user.lastname }}
					</h2>
					<h2 class="text-xl text-gray-400">@{{ user.username }}</h2>
					<h2 class="text-xl text-gray-500">
						<span class="... truncate">
							{{
								user.last_sender === state.user._id ? 'You : ' : 'Friend : '
							}}</span
						>{{ user.last_message.slice(0, 25) }}
						<span v-if="user.last_message.length > 25"> ...</span>
					</h2>
				</div>
				<div>
					<span class="material-icons text-brand">
						<span v-if="user.gender === 'male'">male</span>
						<span v-else-if="user.gender === 'female'">female</span>
						<span v-else>person</span>
					</span>
				</div>
			</RouterLink>
		</div>

		<div
			v-else
			class="mx-auto mt-20 flex h-fit w-full flex-col items-center justify-center pt-[11rem]">
			<img
				:src="LogoIcon"
				class="mx-auto block h-[16rem] w-[16rem]"
				alt="" />

			<h2 class="w-2/3 text-6xl text-gray-600">
				No chats yet! <br />
				<br />
				<span class="text-4xl"
					>Start the buzz by creating a new chat with the button below</span
				>
			</h2>
		</div>
		<router-link
			:to="{ name: 'all-users' }"
			style="font-size: 30px"
			class="fixed bottom-10 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-10 self-end rounded-full border p-5"
				>person_add_alt</span
			>
		</router-link>
	</div>
</template>

<script setup>
import { ConversationStore } from '@/stores/conversation-details.js';
import LogoIcon from '/logo.svg';
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
</script>

<style lang="scss" scoped></style>
