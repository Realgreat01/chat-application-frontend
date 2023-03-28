import { createRouter, createWebHistory } from 'vue-router';
import {
	isLoggedInGuard,
	privateChatGuard,
	protectedRoutes,
	routeAuthGuard,
} from './config';
import {
	AllUsers,
	ChatHistory,
	ChatPage,
	GeneralLayout,
	HomePage,
	LoginPage,
	OwnerProfile,
	PrivacyPolicy,
	RegistrationPage,
	TermsAndConditions,
	UserProfile,
} from './views-imports';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			beforeEnter: isLoggedInGuard,
			component: HomePage,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage,
			beforeEnter: isLoggedInGuard,
		},
		// {
		// 	path: '/test',
		// 	name: 'test',
		// 	component: FeatureTest,
		// },

		{
			path: '/register',
			name: 'register',
			component: RegistrationPage,
			beforeEnter: isLoggedInGuard,
		},
		{
			path: '/chat',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			beforeEnter: protectedRoutes,
			children: [
				{
					path: '',
					component: ChatHistory,
					name: 'all-chats',
				},
				{
					path: 'private',
					name: 'private-chat',
					beforeEnter: privateChatGuard,
					component: ChatPage,
				},
			],
		},
		{
			path: '/users',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'all-users',
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
			],
		},
		{
			path: '/privacy-policy',
			name: 'privacy-policy',
			component: PrivacyPolicy,
		},
		{
			path: '/terms-and-conditions',
			name: 'terms-and-conditions',
			component: TermsAndConditions,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			beforeEnter: isLoggedInGuard,
			component: LoginPage,
		},
	],
});
router.beforeEach(routeAuthGuard);

export default router;
