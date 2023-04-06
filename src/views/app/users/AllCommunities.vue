<template>
	<div class="scroll relative h-screen">
		<div
			class="scroll h-full overflow-y-scroll pb-[2rem] pt-[14rem]"
			v-if="state.allUsers">
			<div
				class="sticky top-0 z-50 flex w-full items-center justify-end gap-x-10 bg-brand-dark p-1">
				<input
					type="text"
					v-if="showSearch"
					name=""
					@input="checkUsers()"
					class="block w-full appearance-none rounded-full border bg-transparent px-2 py-2 pl-5 text-[14px] ring-transparent transition-all duration-500 focus:border-brand focus:outline-none focus:ring-transparent"
					v-model.trim="searchedUser"
					id="" />
				<p
					class="material-icons cursor-pointer justify-self-end rounded-2xl p-2"
					:class="
						showSearch ? 'relative bg-red-700' : 'top-1/5 absolute bg-brand'
					"
					@click="showSearch = !showSearch">
					{{ showSearch ? 'search_off' : 'search' }}
				</p>
			</div>
			<div>
				<div
					v-for="(group, index) in communities.filter(group =>
						group.group_name.toLowerCase().includes(searchedUser.toLowerCase())
					)"
					:key="index"
					class="sticky top-0 mx-4 mt-4 flex cursor-pointer items-start justify-between rounded-lg border-2 border-transparent border-y-gray-900 bg-gray-900 p-4">
					<div class="flex gap-x-4">
						<img
							:src="group.group_icon"
							alt=""
							class="block h-16 w-16 rounded-full bg-brand-dark" />
						<h2 class="flex flex-col">
							<h2 class="text-2xl font-bold">{{ group.group_name }}</h2>
							<h2
								class="flex gap-x-2 text-lg font-thin text-white text-opacity-60">
								<span class="block text-brand">{{
									plugin.abbreviateNumber(group.group_members)
								}}</span>
								<span class="block">Members</span>
							</h2>
						</h2>
					</div>
					<button
						v-if="group.joined"
						class="rounded bg-gray-700 px-4 py-1 text-xl text-gray-100">
						Joined
					</button>
					<button
						v-else
						class="glowing-box glowing-text rounded bg-brand px-4 py-1 text-xl text-white shadow-brand drop-shadow">
						Join
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import axios from '@/axios';
import NotFoundImage from '@/assets/images/404Image.svg';
import { format } from 'timeago.js';
import { plugin } from '@/plugins';
import { ConversationStore } from '@/stores/conversation-details.js';
import { RouterLink } from 'vue-router';
const state = ConversationStore();

const searchedUser = ref('');
const showSearch = ref(false);
const noUserFound = ref(false);

const communities = ref([
	{
		group_name: 'Chat GPT Lovers',
		group_members: 890292920,
		joined: true,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/female/1.png',
	},
	{
		group_name: 'Kings Birth',
		group_members: 578,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/male/3.png',
	},
	{
		group_name: 'Jesus Lovers',
		group_members: 89990,
		group_icon: 'http://chat-application-8v6l.onrender.com/assets/female/3.png',
	},
]);
</script>

<style lang="scss" scoped></style>
