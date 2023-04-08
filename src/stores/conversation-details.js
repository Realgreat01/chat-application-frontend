import { defineStore } from 'pinia';
import axios from '../axios';

const ConversationStore = defineStore('store', {
	state: () => {
		return {
			receiver: {},
			NewsFeed: [],
			allUsers: [],
			chatHistory: [],
			allCommunities: [],
			UserCommunities: [],
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
		async getUserCommunities() {
			try {
				const { data } = await axios.get('/user/community');
				console.log({ communities: data });
				this.UserCommunities = data;
				return this.UserCommunities;
			} catch (error) {}
		},

		async getAllCommunities() {
			try {
				const { data } = await axios.get('/community');
				for (const group of data) group.joining = false;
				console.log(data);
				this.allCommunities = data;
				return this.allCommunities;
			} catch (error) {}
		},

		async joinCommunity(id) {
			try {
				await axios.post('/join-community/' + id);
				this.getAllCommunities();
				this.getUserCommunities();
			} catch (error) {}
		},

		async leaveCommunity(id) {
			try {
				await axios.post('/leave-community/' + id);
				this.getAllCommunities();
				this.getUserCommunities();
			} catch (error) {}
		},
	},
	persist: {
		storage: localStorage,
	},
});

export { ConversationStore };
