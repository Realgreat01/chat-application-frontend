import {defineStore} from 'pinia';
import {ref} from 'vue';

const getAccessToken = () => {
	const token = sessionStorage.getItem('auth-token');
	if (token) return true;
	return false;
};
export const ApplicationState = defineStore('application', () => {
	const isLoggedIn = ref(getAccessToken());
	return {isLoggedIn};
});
