<template>
	<div class="scroll relative mx-auto flex h-screen w-full flex-col bg-brand-dark md:w-1/3">
		<div class="mb-10 flex h-fit w-full items-center justify-between rounded-lg bg-brand p-4">
			<h2 class="my-10 text-6xl font-black">My Profile</h2>
			<RouterLink
				class="material-icons cursor-pointer"
				style="font-size: 50px"
				:to="{name: 'all-chats'}">
				home
			</RouterLink>
		</div>

		<div class="flex flex-col items-center justify-center">
			<div class="relative">
				<img
					class="my-10 block h-60 w-60 rounded-full border-[0.5rem] border-white"
					:src="user.profile_picture"
					alt="" />
				<span
					class="material-icons absolute bottom-0 right-1 text-brand"
					style="font-size: 50px">
					fiber_manual_record
				</span>
			</div>

			<h2 class="mb-3 mt-5 text-5xl font-bold">{{ user.firstname }} {{ user.lastname }}</h2>
			<h2 class="mb-2 text-2xl font-normal text-gray-400">@{{ user.username }}</h2>
			<div>
				<span
					class="material-icons my-10 block text-brand"
					style="font-size: 6rem">
					<span v-if="user.gender === 'male'">male</span>
					<span v-else-if="user.gender === 'female'">female</span>
					<span v-else>person</span>
				</span>
			</div>

			<h2 class="mt-10 text-2xl text-gray-500">Joined : {{ format(user.createdAt) }}</h2>
		</div>
	</div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from '@/axios';
import {format} from 'timeago.js';

const user = ref({});
const getUserProfile = async () => {
	try {
		const {data} = await axios.get('/user');
		user.value = data;
	} catch (error) {}
};

onMounted(() => getUserProfile());
</script>

<style lang="scss" scoped></style>
