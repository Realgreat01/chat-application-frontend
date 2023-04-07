import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedInGuard, protectedRoutes, routeAuthGuard } from './config';
import {
	FeatureTest,
	GeneralLayout,
	HomePage,
	LoginPage,
	PrivacyPolicy,
	RegistrationPage,
	TermsAndConditions,
} from './views-imports';

import { AppRoute } from './routes/app-route';
import { EventsRoute } from './routes/events';
import { MarketRoute } from './routes/marketplace';
import { SettingsRoute } from './routes/settings';
import { TrendsRoute } from './routes/trends';

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
			path: '/test',
			name: 'test',
			component: FeatureTest,
			meta: { requiresAuth: true },
			beforeEnter: protectedRoutes,
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
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: TrendsRoute,
		},
		{
			path: '/events',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: EventsRoute,
		},
		{
			path: '/market-place',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: MarketRoute,
		},
		{
			path: '/settings',
			component: GeneralLayout,
			meta: { requiresAuth: true },
			children: SettingsRoute,
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
