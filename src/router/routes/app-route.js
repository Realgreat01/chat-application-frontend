import {
	AllUsers,
	ChatHistory,
	ChatPage,
	OwnerProfile,
	UserProfile,
} from '../views-imports';

const ChatsRoute = [
	{
		path: '',
		component: ChatHistory,
		name: 'app',
	},
	{
		path: 'private',
		name: 'private-chat',
		component: ChatPage,
	},
	{
		path: 'users',
		name: 'all-users',
		component: AllUsers,
	},
];

const UsersRoute = [
	{
		path: '',
		name: 'users',
		component: AllUsers,
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
