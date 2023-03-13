import {createPinia} from 'pinia';
import {io} from 'socket.io-client';
import {ConversationStore} from '../stores/conversation-details';
const pinia = createPinia();

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
	withCredentials: true,
	autoConnect: false,
	 reconnectionDelay: 10000, 
  reconnectionDelayMax: 10000 
});

const user_is_online = JSON.parse(sessionStorage.getItem('user_is_online'));

const state = ConversationStore(pinia);

socket.on('connect', async () => {
	console.log({recovered: socket.recovered});
	if (socket.recovered || user_is_online) {
		socket.on('get-online-users', users => {
			state.getChatHistory();
			state.allUsers = users;
		});
	} else {
		try {
			const currentUser = await state.getCurrentUser();
			socket.emit('connected-user', currentUser._id);
			sessionStorage.setItem('user_is_online', true);
		} catch (error) {
			console.log(error);
		}
	}
});

socket.on('get-online-users', async users => {
	state.allUsers = users;
	await state.getChatHistory();
});
