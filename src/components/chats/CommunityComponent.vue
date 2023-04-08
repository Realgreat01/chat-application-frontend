<template>
	<div class="">
		<h2 class="sticky top-0 z-50 my-6 flex items-center justify-between px-5">
			<h2 class="text-3xl font-black">Your Communities</h2>
			<button class="rounded-lg bg-brand px-4 py-2 text-brand-dark">
				Create Community
			</button>
		</h2>
		<div
			class="my-5 px-5"
			v-if="state.UserCommunities.length > 0">
			<div
				class="mx-auto my-4 flex w-full gap-x-8 rounded-2xl bg-slate-900 p-3"
				v-for="(group, index) in state.UserCommunities"
				:key="index">
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
					<h2 class="flex gap-x-2 text-lg font-thin text-white text-opacity-60">
						<span class="block text-brand">{{
							plugin.abbreviateNumber(group.group_members.length)
						}}</span>
						<span class="block"
							>Member <span v-if="group.group_members.length > 1">s</span>
						</span>
					</h2>
					<h2 class="text-slate-500">
						<span class="font-medium capitalize text-slate-400">
							<!-- {{ group.last_message.sender }} : -->
						</span>
						<!-- {{ group.last_message.message }} -->
					</h2>
				</h2>
			</div>
		</div>
		<div
			v-else
			class="mx-auto mt-10 flex h-fit w-full flex-col items-center justify-center">
			<img
				:src="LogoIcon"
				class="mx-auto block h-[16rem] w-[16rem]"
				alt="" />

			<h2 class="w-2/3 text-center text-5xl text-gray-600">
				No Communities yet! <br />
				<br />
				<span class="text-3xl"
					>Join a community by create a one new with the button below</span
				>
			</h2>
		</div>
		<router-link
			:to="{ name: 'connect' }"
			style="font-size: 20px"
			@click="state.connectTab = 1"
			class="fixed bottom-24 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-10 self-end rounded-full border p-4"
				>group_add</span
			>
		</router-link>
		<!-- <CreateCommunity @post_created="(createNewPost = false), state.getNewsFeed()" /> -->
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { plugin } from '@/plugins';
// import CreateCommunity from "./CreateCommunity.vue";
import LogoIcon from '/logo.svg';
import { ConversationStore } from '@/stores/conversation-details.js';
const state = ConversationStore();

onMounted(async () => await state.getUserCommunities());
</script>

<style lang="scss" scoped></style>
