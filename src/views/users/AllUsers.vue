<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out md:w-1/3">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<div class="flex h-full flex-col items-start justify-center">
				<RouterLink
					:to="{name: 'all-chats'}"
					class="material-icons block rotate-180 cursor-pointer text-gray-700"
					style="font-size: 40px">
					arrow_right_alt
				</RouterLink>
				<h2 class="mb-10 text-6xl font-black">Users</h2>
			</div>
			<RouterLink
				class="cursor-pointer"
				:to="{name: 'user'}">
				<img
					:src="user.profile_picture"
					class="block h-[4rem] w-[4rem] rounded-full bg-white"
					alt=""
					v-if="user.profile_picture" />
				<p
					class="material-icons"
					style="font-size: 50px"
					v-else>
					account_circle
				</p>
			</RouterLink>
		</div>

		<div
			class="scroll h-full overflow-y-scroll pt-[11rem] pb-[1.4rem]"
			v-if="state.allUsers">
			<RouterLink
				:to="{name: 'single-user', params: {username: user?.username}}"
				v-for="user in state.allUsers"
				class="sticky top-0 mx-4 mt-4 flex cursor-pointer items-start rounded-lg border-2 border-transparent border-y-gray-900 bg-slate-800 p-4">
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
		<router-link
			:to="{name: 'all-chats'}"
			style="font-size: 30px"
			cck="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3"
			class="material-icons fixed bottom-10 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span class="material-icons absolute right-10 self-end rounded-full border p-4"
				>message</span
			>
		</router-link>
	</div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount} from 'vue';
import axios from '@/axios';
import {ConversationStore} from '@/stores/conversation-details.js';
import {RouterLink} from 'vue-router';
const state = ConversationStore();

const user = ref({});

onBeforeMount(async () => {
	const {data} = await axios.get('/user');
	user.value = data;
	state.getAllUsers();
});
</script>
