import { createPinia } from 'pinia';
import { io } from 'socket.io-client';
import { ConversationStore } from '../stores/conversation-details';
const pinia = createPinia();

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
	withCredentials: true,
	autoConnect: false,
	reconnectionDelay: 10000,
	reconnectionDelayMax: 10000,
});

const state = ConversationStore(pinia);

socket.on('get-online-users', users => (state.allUsers = users));
socket.on('get-chat-history', chatHistory => (state.chatHistory = chatHistory));
