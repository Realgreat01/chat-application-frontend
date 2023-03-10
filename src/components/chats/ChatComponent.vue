<template>
	<div
		class="scroll mb-[6.2rem] mt-[12rem] flex h-fit w-full flex-col justify-between overflow-y-scroll rounded"
		ref="chatBox"
		id="chatBox">
		<div
			class=""
			ref="chatsContainer">
			<MessageComponent
				:messages="messages"
				:sender="currentUser"
				:receiver="conversationState.receiver" />
		</div>
		<form
			ref="form"
			class="fixed bottom-0 mx-auto flex h-[6rem] w-full items-center justify-between gap-x-5 bg-gray-700 p-4 md:w-1/3"
			@submit.prevent="sendMessage"
			id="">
			<textarea
				class="scroll block h-20 w-full appearance-none rounded-lg border bg-transparent p-5 text-2xl ring-transparent focus:border-brand focus:outline-none focus:ring-transparent"
				v-model="messageInput"></textarea>
			<!-- Prevent implicit submission of the form -->
			<ButtonComponent custom-class="hidden" />
			<div class="flex -rotate-45 items-center justify-center rounded-full">
				<ButtonComponent
					customClass="material-icons "
					type="submit"
					text="send" />
			</div>
		</form>
	</div>
</template>

<script setup>
import {ref, onMounted, onUpdated, watch} from 'vue';
import {io} from 'socket.io-client';
import MessageComponent from '../chats/MessageComponent.vue';
import axios from '@/axios';
import {ConversationStore} from '@/stores/conversation-details.js';
import ButtonComponent from '../reusables/ButtonComponent.vue';

const conversationState = ConversationStore();
const chatsContainer = ref();
const form = ref();
const messageInput = ref('');
const messages = ref({});

const sender = ref('');
const currentUser = ref({});
const receiver = conversationState.receiver;

// Socket IO configuration
const socket = io(import.meta.env.VITE_SOCKET_URL);

const getCurrentUser = async () => {
	const {data} = await axios.get('/user');
	const {_id: UserID} = data;
	currentUser.value = data;
	sender.value = UserID;
};

socket.on('connect', async () => {
	await getCurrentUser();
	socket.emit('connected-user', sender.value);
});

socket.on('error', error => console.log(error));
socket.on('get-message-from-server', data => {
	window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
	messages.value = data;
});
socket.on('hello', value => console.log(value));

const sendMessage = async () => {
	socket.emit(
		'send-message-to-server',
		sender.value,
		conversationState.receiver._id,
		messageInput.value
	);
	socket.on('get-message-from-server', data => {
		messages.value = data;
	});
	messageInput.value = '';
	window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: 'smooth'});
};

const getUserChatWithRecepient = async receiver_id => {
	const {data} = await axios.get('/chats/' + receiver_id);
	return data;
};
watch(
	() => conversationState.receiver,
	async newValue => {
		messages.value = await getUserChatWithRecepient(newValue._id);
	}
);

onMounted(async () => {
	try {
		if (conversationState.receiver) {
			messages.value = await getUserChatWithRecepient(conversationState.receiver._id);
		}
		await getCurrentUser();
	} catch (error) {}
});
onMounted(() => window.scrollTo(-1, document.body.scrollHeight));
onUpdated(() => window.scrollTo(-1, document.body.scrollHeight));
</script>

<style lang="scss" scoped></style>
