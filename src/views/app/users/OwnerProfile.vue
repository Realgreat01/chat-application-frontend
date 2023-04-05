<template>
	<div
		class="scroll relative mx-auto flex min-h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out">
		<div
			class="sticky top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4">
			<h2 class="my-10 text-6xl font-black">My Profile</h2>
			<div class="flex flex-col items-end gap-y-6">
				<RouterLink
					class="flex cursor-pointer flex-col hover:text-brand-dark"
					style="font-size: 30px"
					:to="{ name: 'app' }">
					<div class="material-icons">home</div>
					<p class="text-sm">Home</p>
				</RouterLink>
				<RouterLink
					class="flex cursor-pointer flex-col text-gray-700 hover:text-white"
					style="font-size: 24px"
					:to="{ name: 'home' }"
					@click="logout">
					<div class="material-icons">logout</div>
					<p class="text-sm">logout</p>
				</RouterLink>
			</div>
		</div>

		<div class="flex flex-col items-center justify-center">
			<div class="relative">
				<div
					class="my-10 block h-60 w-60 rounded-full border-[0.5rem] border-white">
					<img
						class=""
						:src="user.profile_picture"
						alt="" />
				</div>
				<span
					class="material-icons absolute bottom-4 right-4"
					style="font-size: 50px"
					:class="user.is_online ? 'text-brand' : 'text-gray-500'">
					fiber_manual_record
				</span>
			</div>

			<h2 class="mb-3 mt-5 text-5xl font-bold">
				{{ user.firstname }} {{ user.lastname }}
			</h2>
			<h2 class="mb-2 text-2xl font-normal text-gray-400">
				@{{ user.username }}
			</h2>

			<!-- <div class="rounded-full w-1/2" @click="copyLinkToClipBoard">{{ `https://buzz-chat-app.vercel.app/users/${user.username}` }} {{ linkIsCopied? 'copied' : "copy" }}</div> -->
			<!-- Share container  -->
			<div
				class="container flex h-[20rem] w-3/4 flex-col items-center justify-center rounded-xl bg-gray-800 p-4 transition-opacity duration-[1500ms]"
				v-if="showShareContent">
				<div
					class="material-icons absolute top-2 right-2 cursor-pointer rounded-full text-gray-400 hover:bg-gray-500"
					@click="showShareContent = false">
					close
				</div>
				<h2 class="mt-3 mr-10 text-xl font-medium">{{ inviteCopyTop }}</h2>
				<h2 class="my-4 text-2xl font-bold">{{ inviteCopyDown }}</h2>
				<div class="mx-auto flex w-full items-center justify-around">
					<ShareNetwork
						v-for="(content, index) in shareComponents"
						:key="index"
						:network="content.network"
						:url="`https://buzz-chat-app.vercel.app/`"
						title="Connect with me on Syntrix, enjoy fast and realtime messaging !"
						hashtags="buzzchat,buzzchat,messaging,realtime,fast,vue,dev,vuejs">
						<img
							:src="content.icon"
							alt=""
							class="h-12 w-12 rounded-xl bg-gray-900 p-2" />
					</ShareNetwork>
				</div>
			</div>

			<div>
				<span
					class="material-icons my-4 block text-brand"
					style="font-size: 6rem">
					<span v-if="user.gender === 'male'">male</span>
					<span v-else-if="user.gender === 'female'">female</span>
					<span v-else>person</span>
				</span>
			</div>
			<div
				class="material-icons-outlined flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-2"
				style="font-size: 26px"
				@click="showShareContent = !showShareContent"
				:class="showShareContent ? 'bg-brand' : 'bg-gray-900'">
				share
			</div>

			<h2 class="mt-10 text-2xl text-gray-500">
				Joined : {{ format(user.createdAt) }}
			</h2>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from '@/axios';
import { format } from 'timeago.js';
import { socket } from '@/socket.io';
import { ConversationStore } from '@/stores/conversation-details';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import TwitterIcon from '@/assets/icons/twitter.svg';
import LinkedinIcon from '@/assets/icons/linkedin-icon.svg';

const state = ConversationStore();

const inviteCopyTop = ref(
	'Invite your friends to join the party! The more people, the more buzz.'
);
const inviteCopyDown = ref(
	"Let's build an awesome community together on BuzzChat!"
);
const showShareContent = ref(false);
const user = ref({});

const shareComponents = ref([
	{
		network: 'whatsapp',
		icon: WhatsAppIcon,
	},
	{
		network: 'facebook',
		icon: FacebookIcon,
	},
	{
		network: 'twitter',
		icon: TwitterIcon,
	},
	{
		network: 'linkedIn',
		icon: LinkedinIcon,
	},
]);

const getUserProfile = async () => {
	try {
		const { data } = await axios.get('/user');
		user.value = data;
		return data;
	} catch (error) {}
};

const logout = () => {
	sessionStorage.removeItem('auth-token');
	sessionStorage.setItem('user_is_online', false);
	sessionStorage.removeItem('user_is_online');
	localStorage.removeItem('auth-token');
	socket.disconnect();
};
onMounted(async () => {
	await getUserProfile();
});

onMounted(() => (state.showFooter = false));
onUnmounted(() => (state.showFooter = true));
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	top: 60%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
