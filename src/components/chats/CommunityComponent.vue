<template>
	<div class="">
		<h2 class="sticky top-0 z-50 my-6 flex items-center justify-between px-5">
			<h2 class="text-3xl font-black">Your Communities</h2>
			<button class="rounded-lg bg-brand px-4 py-2 text-brand-dark">
				Create Community
			</button>
		</h2>
		<div
			class="my-5 px-5"
			v-if="UserChatRooms.length > 0">
			<div
				class="mx-auto my-4 flex w-full gap-x-8 rounded-2xl bg-slate-900 p-3"
				v-for="(group, index) in UserChatRooms"
				:key="index">
				<img
					:src="group.group_icon"
					alt=""
					class="block h-20 w-20 rounded-full bg-brand-dark" />
				<h2 class="flex flex-col">
					<h2 class="text-2xl font-bold">{{ group.group_name }}</h2>
					<h2 class="flex gap-x-2 text-lg font-thin text-white text-opacity-60">
						<span class="block text-brand">{{
							plugin.abbreviateNumber(group.group_members)
						}}</span>
						<span class="block">Members</span>
					</h2>
					<h2 class="text-slate-500">
						<span class="font-medium capitalize text-slate-400"
							>{{ group.last_message.sender }} :
						</span>
						{{ group.last_message.message }}
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
			:to="{ name: 'connect' }"
			style="font-size: 20px"
			@click="state.connectTab = 1"
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
import { ConversationStore } from '@/stores/conversation-details.js';
const state = ConversationStore();

const UserChatRooms = ref([
	{
		group_name: 'Chat GPT Users',
		group_members: 890292920,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/female/1.png',
		last_message: { sender: 'olakunle', message: "hey I'm new here" },
	},
	{
		group_name: 'Kings Birth',
		group_members: 578,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/male/3.png',
		last_message: { sender: 'Elon Musk', message: 'hey, this is awesome man' },
	},
	{
		group_name: 'Jesus Lovers',
		group_members: 89990,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/female/3.png',
		last_message: { sender: 'Kingsley', message: 'We have a prayer by 8pm' },
	},
]);

onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
