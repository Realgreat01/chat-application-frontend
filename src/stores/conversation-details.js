import {defineStore} from 'pinia';
import axios from '../axios';

export const ConversationStore = defineStore('store', {
	state: () => {
		return {
			receiver: undefined,
			allUsers: undefined,
			chatHistory: undefined,
			user: undefined,
		};
	},
	actions: {
		async getAllUsers() {
			try {
				const {data} = await axios.get('/users');
				this.allUsers = data;
				return this.allUsers;
			} catch (error) {}
		},
		async getChatHistory() {
			try {
				const {data} = await axios.get('/chats');
				console.log(data);
				this.chatHistory = data;
				return this.chatHistory;
			} catch (error) {}
		},
		async getCurrentUser() {
			try {
				const {data} = await axios.get('/user');
				this.user = data;
				return this.user;
			} catch (error) {}
		},
	},
	persist: true,
});
