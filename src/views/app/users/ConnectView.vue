<template>
	<div>
		<div
			class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg bg-brand-dark transition delay-150 ease-in-out">
			<div
				class="fixed top-0 z-50 mx-auto flex h-[14rem] w-full flex-col overflow-hidden rounded-lg bg-brand md:w-1/3">
				<div
					class="flex h-[9.5rem] w-full items-center justify-between p-4 pb-0">
					<div class="flex flex-col items-start justify-center">
						<RouterLink
							:to="{ name: 'app' }"
							class="material-icons block rotate-180 cursor-pointer text-gray-700"
							style="font-size: 40px">
							arrow_right_alt
						</RouterLink>
						<h2
							class="mb-10 flex items-center gap-x-4 text-[2.5rem] font-black">
							<div class="">
								{{ activeComponent.title }}
							</div>
							<span
								v-if="state.allUsers"
								class="text-4xl font-medium"
								>(
								<span class="mx-0 text-3xl text-brand-dark">
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
						class="material-icons m-1 flex cursor-pointer items-center justify-center rounded-xl text-center transition-all duration-700"
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
import Users from './AllUsers.vue';
const state = ConversationStore();

const FindConnect = ref([
	{ icon: 'people', component: Users, title: 'Users', count: 1689938 },
	{
		icon: 'groups',
		component: Communities,
		title: 'Communities',
		count: 909090,
	},
]);
const activeComponent = ref(FindConnect.value[state.connectTab]);
</script>

<style lang="scss" scoped></style>
