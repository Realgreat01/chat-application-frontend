const getAccessToken = () => {
	const token = localStorage.getItem('auth-token');
	if (token) return true;
	return false;
};

const routeAuthGuard = (to, from) => {
	if (to.meta.requiresAuth && getAccessToken() === false) {
		return {
			name: 'login',
		};
	}
};

const protectedRoutes = (to, from, next) => {
	if (getAccessToken()) next();
	else next({name: 'login'});
};

const isLoggedInGuard = (to, from) => {
	if (from.name === undefined && getAccessToken()) {
		return {
			name: 'all-chats',
		};
	}
	if (from.name !== undefined && getAccessToken()) return false;
	if (from.name === undefined && !getAccessToken()) return true;
	return true;
};

const privateChatGuard = (to, from) => {
	if (from.name !== 'all-chats' && from.name !== 'single-user')
		return {
			name: 'all-chats',
		};
	return true;
};

export {getAccessToken, routeAuthGuard, isLoggedInGuard, protectedRoutes, privateChatGuard};
