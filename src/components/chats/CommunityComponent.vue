<template>
	<div class="">
		<div
			class="my-5"
			v-if="UserChatRooms.length > 0">
			<h2 class="sticky top-0 z-50 mb-10 ml-10 mt-4 text-4xl font-black">
				Your Communities
			</h2>
			<div
				class="mx-auto my-4 flex w-[90%] gap-x-8 rounded-2xl bg-slate-900 p-3"
				v-for="(group, index) in UserChatRooms"
				:key="index">
				<img
					:src="group.group_icon"
					alt=""
					class="block h-16 w-16 rounded-full bg-brand-dark" />
				<h2 class="flex flex-col">
					<h2 class="text-2xl font-bold">{{ group.group_name }}</h2>
					<h2 class="flex gap-x-2 text-lg font-thin text-white text-opacity-60">
						<span class="block text-brand">{{
							plugin.abbreviateNumber(group.group_members)
						}}</span>
						<span class="block">Members</span>
					</h2>
				</h2>
			</div>
		</div>
		<div
			v-else
			class="mx-auto mt-10 flex h-fit w-full flex-col items-center justify-center">
			<img
				:src="LogoIcon"
				class="mx-auto block h-[16rem] w-[16rem]"
				alt="" />

			<h2 class="w-2/3 text-center text-5xl text-gray-600">
				No Communities yet! <br />
				<br />
				<span class="text-3xl"
					>Join a community by create a one new with the button below</span
				>
			</h2>
		</div>
		<router-link
			:to="{ name: 'all-users' }"
			style="font-size: 20px"
			class="fixed bottom-24 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-10 self-end rounded-full border p-4"
				>group_add</span
			>
		</router-link>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { plugin } from '@/plugins';
import LogoIcon from '/logo.svg';

const UserChatRooms = ref([
	{
		group_name: 'Chat GPT Lovers',
		group_members: 890292920,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/female/1.png',
	},
	{
		group_name: 'Kings Birth',
		group_members: 578,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/male/3.png',
	},
	{
		group_name: 'Jesus Lovers',
		group_members: 89990,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/female/3.png',
	},
]);

onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
