<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col p-4 transition delay-150 ease-in-out md:w-1/3">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<h2 class="my-10 text-6xl font-black">Chat</h2>
			<div class="">
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
				<h2 class="w-full py-4 pr-8 text-right text-3xl text-gray-700">
					@{{ receiver.username }}
				</h2>
			</div>
		</div>
		<div class="scroll min-h-fit">
			<ChatComponent />
		</div>
	</div>
</template>

<script setup>
import {onMounted} from 'vue';
import ChatComponent from '@/components/chats/ChatComponent.vue';
import {ConversationStore} from '@/stores/conversation-details.js';
const conversationState = ConversationStore();
const receiver = conversationState.receiver;
onMounted(() => console.log(receiver));
</script>
