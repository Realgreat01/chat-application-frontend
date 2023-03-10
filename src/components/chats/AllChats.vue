<template>
	<div class="scroll relative mx-auto h-screen w-full bg-brand-dark">
		<div class="mb-2 flex h-fit w-full items-center justify-between rounded-lg bg-brand p-4">
			<h2 class="my-10 text-6xl font-black">Chats History</h2>
			<RouterLink
				class="cursor-pointer"
				:to="{name: 'user'}">
				<img
					:src="user.profile_picture"
					class="block h-[4rem] w-[4rem] rounded-full bg-white"
					alt=""
					v-if="user.profile_picture" />
				<p
					class="material-icons"
					style="font-size: 50px">
					account_circle
				</p>
			</RouterLink>
		</div>

		<RouterLink
			:to="{name: 'private-chat'}"
			@click="Conversation.receiver = user"
			v-for="user in chats"
			:key="user._id"
			class="sticky top-0 mx-4 mt-4 flex cursor-pointer items-start rounded-lg border-2 border-transparent border-y-gray-900 bg-slate-700 p-4">
			<img
				:src="user.profile_picture || 'https://xsgames.co/randomusers/avatar.php?g=male'"
				class="block h-[4rem] w-[4rem] rounded-full bg-white"
				alt="" />
			<div class="m-2 mx-4">
				<h2 class="text-2xl font-bold">
					{{ user.firstname }} {{ user.lastname }} {{ user.fullname }}
				</h2>
				<h2 class="text-xl text-gray-400">@{{ user.username }}</h2>
			</div>
			<div>
				<span class="material-icons">
					<span v-if="user.gender === 'male'">male</span>
					<span v-else-if="user.gender === 'female'">female</span>
					<span v-else>person</span>
				</span>
			</div>
		</RouterLink>
	</div>
	<!-- </div> -->
</template>

<script setup>
import axios from '@/axios';
import {onMounted, ref} from 'vue';
import {ConversationStore} from '@/stores/conversation-details.js';

const Conversation = ConversationStore();

const chats = ref([]);
const user = ref({});

const getUserChats = async () => {
	const {data} = await axios.get('/chats');
	console.log(data);
	chats.value = data;
};

async function generatePDF() {
	try {
		const urlL = 'http://localhost:5173/profile/chats';
		const response = await axios.get(`/pdf?url=${urlL}`, {
			responseType: 'blob',
		});
		const blob = new Blob([response.data], {type: 'application/pdf'});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error(error);
	}
}

onMounted(async () => {
	const {data} = await axios.get('/user');
	user.value = data;
	getUserChats();
});
</script>

<style lang="scss" scoped></style>
