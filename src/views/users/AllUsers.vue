<template>
	<div class="scroll relative mx-auto flex h-screen w-full flex-col bg-brand-dark md:w-1/3">
		<div class="mb-2 flex h-fit w-full items-center justify-between rounded-lg bg-brand p-4">
			<h2 class="my-10 text-6xl font-black">Users</h2>
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
					style="font-size: 50px">
					account_circle
				</p>
			</RouterLink>
		</div>

		<div class="scroll h-full overflow-y-scroll">
			<RouterLink
				:to="{name: 'single-user', params: {username: user.username}}"
				v-for="user in AllUsers"
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
		<router-link
			:to="{name: 'all-chats'}"
			style="font-size: 30px"
			class="material-icons sticky bottom-6 left-5 block w-fit self-end rounded-full border p-4">
			message
		</router-link>
	</div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from '@/axios';

const AllUsers = ref([]);
const user = ref({});
const getAllUsers = async () => {
	const {data} = await axios.get('/users');
	AllUsers.value = data;
	console.log(data);
};

onMounted(async () => {
	const {data} = await axios.get('/user');
	user.value = data;
	getAllUsers();
});
</script>
