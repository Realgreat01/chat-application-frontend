<template>
	<div class="scroll relative mx-auto flex h-screen w-full flex-col p-4 md:w-1/3">
		<AllChats />
		<router-link
			:to="{name: 'all-users'}"
			style="font-size: 30px"
			class="material-icons absolute bottom-6 right-5 block rounded-full border p-4">
			person_add_alt
		</router-link>
	</div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {io} from 'socket.io-client';
import axios from '@/axios';
import AllChats from '@/components/chats/AllChats.vue';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const sender = ref('');

const getCurrentUser = async () => {
	const {data} = await axios.get('/user');
	const {_id: UserID} = data;
	sender.value = UserID;
};

onMounted(() => {
	socket.on('connect', async () => {
		await getCurrentUser();
		socket.emit('connected-user', sender.value);
	});
});
</script>

<style lang="scss" scoped></style>
