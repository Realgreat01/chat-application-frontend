<template>
  <div class="scroll w-full" ref="chatMessageBox">
    <MessageComponent
      :messages="messages"
      :sender="currentUser"
      :receiver="conversationState.receiver"
    />

    <form
      class="fixed bottom-0 mx-auto flex h-[6rem] w-full items-center justify-between gap-x-5 bg-slate-700 p-4 md:w-1/3"
      @submit.prevent="sendMessage"
      id=""
    >
      <textarea
        class="scroll block h-20 w-full appearance-none rounded-full border bg-transparent p-5 text-2xl ring-transparent focus:border-brand focus:outline-none focus:ring-transparent"
        v-model="messageInput"
      ></textarea>
      <!-- Prevent implicit submission of the form -->
      <ButtonComponent custom-class="hidden" />

      <button
        type="submit"
        class="flex h-20 w-20 items-center justify-center rounded-full border-brand"
      >
        <img :src="replyIcon" alt="" class="h-16 w-16" />
      </button>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted, onUpdated, watch} from 'vue';
import {io} from 'socket.io-client';
import replyIcon from '../icons/svgs/reply-icon.svg';
import MessageComponent from '../chats/MessageComponent.vue';
import axios from '@/axios';
import {ConversationStore} from '@/stores/conversation-details.js';
import ButtonComponent from '../reusables/ButtonComponent.vue';

const conversationState = ConversationStore();
const messageInput = ref('');
const messages = ref([]);
const sender = ref('');
const currentUser = ref({});

// Socket IO configuration
const socket = io(import.meta.env.VITE_SOCKET_URL, {withCredentials: true});

const getCurrentUser = async () => {
	try {
		const {data} = await axios.get('/user');
		const {_id: UserID} = data;
		currentUser.value = data;
		sender.value = UserID;
		return UserID;
	} catch {
};

socket.on('connect', async () => {
	try {
		const user = await getCurrentUser();
		socket.emit('connected-user', user);
		socket.on('get-message-from-server', data => {});
	} catch (error) {}
});

const sendMessage = async () => {
	socket.emit(
		'send-message-to-server',
		sender.value,
		conversationState.receiver._id,
		messageInput.value
	);
	messageInput.value = '';
};
socket.on('get-message-from-server', data => {
	messages.value = data;
});

const getUserChatWithRecepient = async receiver_id => {
	const {data} = await axios.get('/chats/' + receiver_id);
	return data;
};

onMounted(async () => {
	try {
		if (conversationState.receiver) {
			messages.value = await getUserChatWithRecepient(conversationState.receiver._id);
		}
		await getCurrentUser();
	} catch (error) {}
});

const chatMessageBox = ref('');

const getScrolls = () => {
	console.log({
		chatMessageBox: chatMessageBox.value.scrollHeight,
	});
};
watch(
	() => chatMessageBox,
	(current, old) => {
		console.log('watch');
		getScrolls();
	}
);
onMounted(() => window.scrollTo(0, document.body.scrollHeight));
onUpdated(() => {
	console.log('function onUpdated');
	getScrolls();
});
</script>

<style lang="scss" scoped></style>
