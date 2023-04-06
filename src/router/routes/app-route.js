import MainApp from '../../views/app/MainApp.vue';
import ChatPage from '../../views/app/chats/ChatPage.vue';
import Connect from '../../views/app/users/ConnectView.vue';
import OwnerProfile from '../../views/app/users/OwnerProfile.vue';
import UserProfile from '../../views/app/users/UserProfile.vue';

const ChatsRoute = [
	{
		path: '',
		component: MainApp,
		name: 'app',
	},
	{
		path: 'private',
		name: 'private-chat',
		component: ChatPage,
	},
	{
		path: 'connect',
		name: 'connect',
		component: Connect,
	},
];

const UsersRoute = [
	{
		path: '',
		name: 'users',
		component: Connect,
	},
	{
		path: 'user',
		name: 'user',
		component: OwnerProfile,
	},
	{
		path: ':username',
		name: 'single-user',
		props: true,
		meta: { requiresAuth: false },
		component: UserProfile,
	},
];

const AppRoute = { UsersRoute, ChatsRoute };

export { AppRoute };
