<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col overflow-y-scroll rounded-t-lg bg-brand-dark pb-[6.5rem] pt-[12rem] transition delay-150 ease-in-out"
		ref="chatMessageWrapper">
		<div
			class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3">
			<div class="flex h-full flex-col items-start justify-center">
				<RouterLink
					class="material-icons rotate-180 cursor-pointer text-gray-700"
					style="font-size: 40px"
					:to="{ name: 'all-chats' }">
					arrow_right_alt
				</RouterLink>
				<h2 class="mb-4 text-6xl font-black">Chat</h2>
				<h2 class="mb-10 text-xl font-black text-gray-900">
					<span
						class=""
						v-if="receiver.is_online">
						online</span
					>
					<span
						class=""
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
				<RouterLink
					:to="{
						name: 'single-user',
						params: { username: receiver.username },
					}">
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
				</RouterLink>
				<h2 class="w-full py-4 text-right text-2xl text-gray-700">
					@{{ receiver.username }}
				</h2>
			</div>
		</div>

		<div
			class="scroll h-full w-full flex-1 overflow-y-scroll px-2 pb-3"
			id="chat-message-box">
			<MessageComponent
				:messages="messages"
				:sender="currentUser"
				:receiver="receiver" />
		</div>
		<form
			class="fixed bottom-0 mx-auto flex h-[7rem] w-full items-center justify-between gap-x-5 bg-gray-800 p-4 md:w-1/3"
			@submit.prevent="sendMessage"
			id="">
			<textarea
				placeholder="type message here ...."
				class="scroll block h-20 w-full appearance-none rounded-full border bg-transparent p-5 text-[16px] ring-transparent focus:border-brand focus:outline-none focus:ring-transparent"
				v-model.trim="messageInput">
			</textarea>
			<!-- Prevent implicit submission of the form -->
			<ButtonComponent custom-class="hidden" />

			<button
				type="submit"
				class="flex h-20 w-20 items-center justify-center rounded-full border-brand">
				<img
					:src="replyIcon"
					alt=""
					class="h-16 w-16 hover:p-2" />
			</button>
		</form>
	</div>
</template>

<script setup>
import axios from '@/axios';
import { ref, onMounted, onUpdated, onBeforeUpdate, nextTick } from 'vue';
import { format } from 'timeago.js';
import { socket } from '@/socket.io';
import { ConversationStore } from '@/stores/conversation-details.js';
import replyIcon from '@/components/icons/svgs/reply-icon.svg';
import MessageComponent from '@/components/chats/MessageComponent.vue';
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';

const state = ConversationStore();

const receiver = state.receiver;
const currentUser = state.user;

const messageInput = ref('');
const messages = ref([]);

const chatMessageBox = ref();

const getConversations = async receiver_id => {
	const { data } = await axios.get('/chats/' + receiver_id);
	return data;
};

async function scrollChatDownward() {
	await nextTick(() => {
		const chatMessageBox = document.getElementById('chat-message-box');
		const contentHeight = chatMessageBox.scrollHeight;
		const containerHeight = chatMessageBox.clientHeight;
		chatMessageBox.scrollTop = contentHeight - containerHeight;
	});
}

async function scrollChatSmooth() {
	await nextTick(() => {
		const chatMessageBox = document.getElementById('chat-message-box');
		const contentHeight = chatMessageBox.scrollHeight;
		const containerHeight = chatMessageBox.clientHeight;
		chatMessageBox.scrollTo({
			top: contentHeight - containerHeight,
			behavior: 'smooth',
		});
	});
}

// Socket IO configuration
const sendMessage = async () => {
	try {
		socket.emit(
			'send-message-to-server',
			currentUser._id,
			receiver._id,
			messageInput.value
		);
		messageInput.value = '';
		scrollChatSmooth();
		socket.emit('get-current-state', currentUser._id);
	} catch (error) {}
};

socket.on('get-message-from-server', data => {
	messages.value = data;
	scrollChatSmooth();
});

onBeforeUpdate(() => {});

onUpdated(() => scrollChatDownward());

onMounted(async () => {
	try {
		if (receiver) {
			messages.value = await getConversations(receiver._id);
		}
		currentUser.value = await state.getCurrentUser();
		const scrollDown = setInterval(() => scrollChatDownward(), 50);
		setTimeout(() => clearInterval(scrollDown), 1000);
	} catch (error) {}
});
</script>
