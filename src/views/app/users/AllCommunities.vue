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
					v-for="group in state.allCommunities.filter(group =>
						group.group_name.toLowerCase().includes(searchedUser.toLowerCase())
					)"
					:key="group._id"
					class="sticky top-0 mx-4 mt-4 flex cursor-pointer items-start justify-between rounded-lg border-2 border-transparent border-y-gray-900 bg-gray-900 p-4">
					<div class="flex gap-x-4">
						<img
							v-if="group.group_icon"
							:src="group.group_icon"
							alt=""
							class="block h-20 w-20 rounded-full bg-brand-dark" />
						<p
							v-else
							:src="group.group_icon"
							alt=""
							style="font-size: 30px"
							class="material-icons flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gray-500">
							group
						</p>
						<h2 class="flex flex-col">
							<h2 class="text-2xl font-bold">{{ group.group_name }}</h2>
							<h2
								class="flex gap-x-2 text-lg font-thin text-white text-opacity-60">
								<span class="block text-brand">{{
									plugin.abbreviateNumber(group.group_members.length)
								}}</span>
								<span class="block">
									<span class="">Member</span>
									<span v-if="group.group_members.length > 1">s</span>
								</span>
							</h2>
						</h2>
					</div>
					<button
						v-if="group.creator === state.user._id"
						class="rounded bg-gray-700 px-4 py-1 text-xl text-gray-100">
						Creator
					</button>
					<button
						v-else-if="group.joined"
						class="rounded bg-gray-700 px-4 py-1 text-xl text-gray-100">
						Joined
					</button>
					<button
						v-else-if="group.joining"
						disabled
						class="cursor-not-allowed rounded bg-orange-800 px-4 py-1 text-xl text-white shadow-brand drop-shadow">
						Joining
					</button>
					<button
						v-else
						@click="joinCommunity(group)"
						class="glowing-box rounded bg-brand px-6 py-1 text-xl text-brand-dark shadow-brand drop-shadow">
						Join
					</button>
				</div>
			</div>
		</div>
		<router-link
			:to="{ name: 'app' }"
			style="font-size: 20px"
			class="material-icons fixed bottom-24 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-10 self-end rounded-full border p-4"
				>groups</span
			>
		</router-link>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import axios from '@/axios';
import NotFoundImage from '@/assets/images/404Image.svg';
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';
import { format } from 'timeago.js';
import { plugin } from '@/plugins';
import { ConversationStore } from '@/stores/conversation-details.js';
const state = ConversationStore();

const searchedUser = ref('');
const showSearch = ref(false);

const noUserFound = ref(false);

const joinCommunity = async group => {
	try {
		group.joining = true;
		await state.joinCommunity(group.group_id);
	} catch (error) {
	} finally {
		setTimeout(() => (group.joining = false), 500);
	}
};

onMounted(async () => await state.getAllCommunities());
</script>

<style lang="scss" scoped></style>
