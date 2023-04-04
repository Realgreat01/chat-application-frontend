import { defineStore } from 'pinia';
import axios from '../axios';

export const ConversationStore = defineStore('store', {
	state: () => {
		return {
			receiver: {},
			allUsers: [],
			chatHistory: [],
			showFooter: true,
			homeTab: 0,
			user: {},
		};
	},
	actions: {
		async getAllUsers() {
			try {
				const { data } = await axios.get('/users');
				this.allUsers = data;
				return this.allUsers;
			} catch (error) {}
		},
		async getChatHistory() {
			try {
				const { data } = await axios.get('/chats');
				this.chatHistory = data;
				return this.chatHistory;
			} catch (error) {}
		},
		async getCurrentUser() {
			try {
				const { data } = await axios.get('/user');
				this.user = data;
				return this.user;
			} catch (error) {}
		},
	},
	persist: {
		storage: localStorage,
		path: [!'showFooter'],
	},
});
