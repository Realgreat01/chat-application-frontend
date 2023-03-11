<template>
	<div class="scroll relative mx-auto flex h-screen w-full flex-col p-4 md:w-1/3">
		<AllChats />
		<router-link
			:to="{name: 'all-users'}"
			style="font-size: 30px"
			class="material-icons absolute bottom-8 right-10 block rounded-full border p-4">
			person_add_alt
		</router-link>
	</div>
</template>

<script setup>
import AllChats from '@/components/chats/AllChats.vue';
import {onMounted, onBeforeMount} from 'vue';
import {ConversationStore} from '@/stores/conversation-details.js';
const state = ConversationStore();

onMounted(async () => {
	state.getChatHistory();
	state.getCurrentUser();
	state.getAllUsers();
});

onBeforeMount(async () => {
	state.getChatHistory();
	state.getCurrentUser();
	state.getAllUsers();
});
</script>

<style lang="scss" scoped></style>
