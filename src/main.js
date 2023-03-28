import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import Message from 'vue-m-message';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import router from './router/router';

import 'material-icons/iconfont/material-icons.css';
import 'vue-m-message/dist/style.css';
import './assets/main.scss';
import './assets/tailwind.scss';

const VMessageOptions = {
	name: 'dev-resume',
	defaultOptions: { closable: false, position: 'top-right', width: '300px' },
};

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(VueSocialSharing);
app.use(router);

app.use(Message, VMessageOptions);

app.mount('#app');
