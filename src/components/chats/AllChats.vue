<template>
	<div class="scroll relative mx-auto h-screen w-full bg-brand-dark">
		<div class="mb-2 flex h-fit w-full items-center justify-between rounded-lg bg-brand p-4">
			<h2 class="my-10 text-6xl font-black">Chats History</h2>
			<RouterLink
				class="cursor-pointer"
				:to="{name: 'user'}">
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
			</RouterLink>
		</div>

		<div v-if="state.chatHistory.length !== 0">
			<RouterLink
				:to="{name: 'private-chat'}"
				@click="state.receiver = user"
				v-for="user in state.chatHistory"
				:key="user._id"
				class="sticky top-0 mx-4 mt-4 flex cursor-pointer items-start rounded-lg border-2 border-transparent border-y-gray-900 bg-slate-700 p-4">
				<img
					:src="
						user.profile_picture || 'https://xsgames.co/randomusers/avatar.php?g=male'
					"
					class="block h-[4rem] w-[4rem] rounded-full bg-white"
					alt="" />
				<div class="m-2 mx-4">
					<h2 class="text-2xl font-bold">
						{{ user.firstname }} {{ user.lastname }} {{ user.fullname }}
					</h2>
					<h2 class="text-xl text-gray-400">@{{ user.username }}</h2>
				</div>
				<div>
					<span class="material-icons">
						<span v-if="user.gender === 'male'">male</span>
						<span v-else-if="user.gender === 'female'">female</span>
						<span v-else>person</span>
					</span>
				</div>
			</RouterLink>
		</div>

		<div
			v-else
			class="top-1/3 mx-auto mt-20 flex h-fit w-full flex-col items-center justify-center">
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
	</div>
	<!-- </div> -->
</template>

<script setup>
import {onMounted, onBeforeMount, ref} from 'vue';
import {ConversationStore} from '@/stores/conversation-details.js';
import LogoIcon from '/logo.svg';

const state = ConversationStore();

onBeforeMount(async () => {
	state.getChatHistory();
	state.getCurrentUser();
	state.getAllUsers();
});
onMounted(() => {
	console.log(Boolean(state.chatHistory.length));
	const arr = [];
	if (arr.length) {
		console.log('The array is truthy');
	} else {
		console.log('The array is falsy');
	}

	if (Array.isArray(arr) && state.chatHistory.length === 0) {
		console.log('The array is empty');
	} else {
		console.log('The array is not empty');
	}

	console.log(state.chatHistory.length);
});
</script>

<style lang="scss" scoped></style>
