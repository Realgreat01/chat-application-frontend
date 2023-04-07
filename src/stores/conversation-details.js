import { defineStore } from 'pinia';
import axios from '../axios';

const ConversationStore = defineStore('store', {
	state: () => {
		return {
			receiver: {},
			NewsFeed: [],
			allUsers: [],
			chatHistory: [],
			showFooter: true,
			homeTab: 0,
			currentHomeTab: 0,
			connectTab: 0,
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
		async getNewsFeed() {
			try {
				const { data } = await axios.get('/get-post');
				this.NewsFeed = data;
				return this.NewsFeed;
			} catch (error) {}
		},

		getHomeTab(value) {
			this.homeTab = parseInt(value);
		},
	},
	persist: {
		storage: localStorage,
	},
});

export { ConversationStore };
