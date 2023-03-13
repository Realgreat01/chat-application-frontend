import {io} from 'socket.io-client';
import { createPinia } from "pinia";
import {ConversationStore} from '../stores/conversation-details';
const pinia = createPinia();

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
	withCredentials: true,
	autoConnect: false,
});
const state = ConversationStore(pinia);
const currentUser = await state.getCurrentUser()

socket.on('connect', async() => {
	try{
console.log(currentUser);
		socket.emit('connected-user', currentUser._id);
	} catch{

	}
});

socket.on('get-online-users', users => {
	state.getChatHistory();
	state.allUsers = users;
	state.getAllUsers();
});

