<template>
	<div
		class="scroll mx-auto flex min-h-screen w-full flex-col rounded-t-lg bg-gray-800 transition delay-150 ease-in-out md:w-1/3">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<div class="flex h-full flex-col items-start justify-center">
				<RouterLink
					class="material-icons rotate-180 cursor-pointer text-gray-700"
					style="font-size: 40px"
					:to="{name: 'all-chats'}">
					arrow_right_alt
				</RouterLink>
				<h2 class="mb-4 text-6xl font-black">Chat</h2>
				<h2 class="mb-10 text-xl font-black text-gray-200">
					<span
						class=""
						v-if="receiver.isOnline">
						online</span
					>
					<span
						class="capitalize italic"
						v-else-if="receiver.last_seen">
						Last Seen :
						{{ format(receiver.last_seen) }}
					</span>
					<span
						class=""
						v-else>
						Last Seen
						{{ format(Date.now()) }}
					</span>
				</h2>
			</div>
			<div class="flex flex-col items-end">
				<img
					:src="receiver.profile_picture"
					alt=""
					class="block h-20 w-20 rounded-full bg-gray-900"
					v-if="receiver.profile_picture" />
				<h2
					class="material-icons cursor-pointer"
					style="font-size: 50px"
					v-else>
					account_circle
				</h2>
				<h2 class="w-full py-4 text-right text-3xl text-gray-700">
					@{{ receiver.username }}
				</h2>
			</div>
		</div>

		<div class="scroll min-h-fit w-full">
			<ChatComponent />
		</div>
	</div>
</template>

<script setup>
import ChatComponent from '@/components/chats/ChatComponent.vue';
import {ConversationStore} from '@/stores/conversation-details.js';
import {format} from 'timeago.js';
const conversationState = ConversationStore();
const receiver = conversationState.receiver;
</script>
