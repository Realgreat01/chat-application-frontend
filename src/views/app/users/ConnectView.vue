<template>
	<div>
		<div
			class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out">
			<div
				class="fixed top-0 z-50 mx-auto flex h-[12rem] w-full flex-col overflow-hidden rounded-lg bg-brand pt-3 md:w-1/3">
				<div class="flex h-[6.5rem] w-full items-center justify-between p-4">
					<div class="flex flex-col items-start justify-center">
						<RouterLink
							:to="{ name: 'app' }"
							class="mt-4">
							<ArrowLeftCircleIcon
								class="block h-12 w-12 cursor-pointer text-gray-700" />
						</RouterLink>
						<h2 class="flex items-center gap-x-4 text-[2.5rem] font-black">
							<div class="">
								{{ activeComponent.title }}
							</div>
							<span
								v-if="state.allUsers"
								class="text-3xl font-medium"
								>(
								<span class="mx-0 text-2xl text-brand-dark">
									{{ plugin.abbreviateNumber(activeComponent.count) }}
								</span>

								)
							</span>
						</h2>
					</div>
					<RouterLink
						class="cursor-pointer"
						:to="{ name: 'user' }">
						<img
							:src="state.user.profile_picture"
							class="block h-[4rem] w-[4rem] rounded-full bg-white"
							alt=""
							v-if="state.user.profile_picture" />
						<p
							class="material-icons"
							style="font-size: 50px"
							v-else>
							account_circle
						</p>
					</RouterLink>
				</div>
				<div class="grid w-full flex-1 grid-cols-2 gap-2 bg-slate-900 p-1">
					<h2
						class="material-icons m-1 flex cursor-pointer items-center justify-center rounded-xl text-center transition-all duration-200"
						v-for="(connect, index) in FindConnect"
						:class="
							activeComponent === connect ? ' bg-gray-700' : 'bg-slate-900'
						"
						:key="index"
						@click="activeComponent = connect">
						{{ connect.icon }}
					</h2>
				</div>
			</div>
			<component :is="activeComponent.component" />
		</div>
	</div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { plugin } from '@/plugins';
import { ConversationStore } from '@/stores/conversation-details.js';
import Communities from './AllCommunities.vue';
import AllUsers from './AllUsers.vue';
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid';
const state = ConversationStore();

const FindConnect = shallowRef([
	{
		icon: 'people',
		component: AllUsers,
		title: 'Users',
		count: 1689938,
	},
	{
		icon: 'groups',
		component: Communities,
		title: 'Communities',
		count: 909090,
	},
]);
const activeComponent = shallowRef(FindConnect.value[state.connectTab]);
</script>

<style lang="scss" scoped></style>
