import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedInGuard, protectedRoutes, routeAuthGuard } from './config';
import {
	GeneralLayout,
	HomePage,
	LoginPage,
	PrivacyPolicy,
	RegistrationPage,
	TermsAndConditions,
} from './views-imports';

import { AppRoute } from './routes/app-route';

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

		{
			path: '/register',
			name: 'register',
			component: RegistrationPage,
			beforeEnter: isLoggedInGuard,
		},
		{
			path: '/app',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			beforeEnter: protectedRoutes,
			children: AppRoute.ChatsRoute,
		},
		{
			path: '/users',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: AppRoute.UsersRoute,
		},
		{
			path: '/trends',
			name: 'trends',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: AppRoute.UsersRoute,
		},
		{
			path: '/events',
			name: 'events',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: AppRoute.UsersRoute,
		},
		{
			path: '/market-place',
			component: GeneralLayout,
			name: 'market-place',
			meta: { requiresAuth: true },
			children: AppRoute.UsersRoute,
		},
		{
			path: '/settings',
			name: 'settings',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: AppRoute.UsersRoute,
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
