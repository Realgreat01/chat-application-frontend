<template>
	<div>
		<div
			v-if="state.chatHistory.length !== 0"
			class="">
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
			style="font-size: 20px"
			class="fixed bottom-20 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-10 self-end rounded-full border p-4"
				>person_add_alt</span
			>
		</router-link>
	</div>
</template>

<script setup>
import { ConversationStore } from '@/stores/conversation-details.js';
import { socket } from '@/socket.io';
import LogoIcon from '/logo.svg';
const state = ConversationStore();
</script>

<style lang="scss" scoped></style>
