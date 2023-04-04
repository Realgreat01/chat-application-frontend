<template>
	<div
		class="scroll mx-auto flex min-h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out">
		<div
			class="sticky top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0">
			<div class="flex h-full flex-col items-start justify-center">
				<RouterLink
					class="material-icons rotate-180 cursor-pointer text-gray-700"
					style="font-size: 40px"
					:to="{ name: 'app' }">
					arrow_right_alt
				</RouterLink>
				<h2 class="mb-10 text-6xl font-black">Chat</h2>
			</div>
			<RouterLink
				class="material-icons cursor-pointer"
				style="font-size: 50px"
				:to="{ name: 'private-chat' }"
				@click="state.receiver = user">
				message
			</RouterLink>
		</div>

		<div class="flex flex-col items-center justify-center">
			<div class="relative">
				<img
					class="my-10 block h-60 w-60 rounded-full border-[0.5rem] border-white"
					:src="user.profile_picture"
					alt="" />
				<span
					class="material-icons absolute bottom-5 right-4"
					:class="user.is_online ? 'text-brand' : 'text-gray-500'"
					style="font-size: 50px">
					fiber_manual_record
				</span>
			</div>

			<h2 class="mb-3 mt-5 text-5xl font-bold">
				{{ user.firstname }} {{ user.lastname }}
			</h2>
			<h2 class="mb-2 text-2xl font-normal text-gray-400">
				@{{ user.username }}
			</h2>
			<div>
				<span
					class="material-icons my-10 block text-brand"
					style="font-size: 6rem">
					<span v-if="user.gender === 'male'">male</span>
					<span v-else-if="user.gender === 'female'">female</span>
					<span v-else>person</span>
				</span>
			</div>

			<h2 class="mt-10 text-2xl text-gray-500">
				Joined : {{ format(user.createdAt) }}
			</h2>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/axios';
import { format } from 'timeago.js';
import { ConversationStore } from '@/stores/conversation-details.js';

const state = ConversationStore();
const receiver = state.receiver;

const route = useRoute();
const user = ref({});
const getUserProfile = async () => {
	try {
		const { data } = await axios.get('/user/' + route.params.username);
		user.value = data;
	} catch (error) {}
};

onMounted(() => {
	getUserProfile();
});
onMounted(() => (state.showFooter = false));
onUnmounted(() => (state.showFooter = true));
</script>

<style lang="scss" scoped></style>
