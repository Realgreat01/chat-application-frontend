import { defineStore } from 'pinia';
import Message from 'vue-m-message';
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
				console.log(data);
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
				for (const group of data) group.leaving = false;
				this.UserCommunities = data;
				console.log({ usercommunititees: data });
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
				await this.getAllCommunities();
				Message.success('Successfully joined group');
			} catch (error) {
				console.log(error);
				Message.error('Unable to group');
			}
		},

		async leaveCommunity(id) {
			try {
				await axios.post('/leave-community/' + id);
				await this.getUserCommunities();
				Message.success('Successfully left group');
			} catch (error) {
				console.log(error);
				Message.error('Unable to leave group');
			}
		},
	},
	persist: {
		storage: localStorage,
	},
});

export { ConversationStore };
