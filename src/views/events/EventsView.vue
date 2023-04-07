<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-gray-900 transition delay-150 ease-in-out">
		<h2 class="sticky top-0 z-50 rounded-xl bg-brand p-8 text-6xl font-bold">
			Events
		</h2>

		<h2 class="sticky top-0 z-50 mb-2 my-6 flex items-center justify-between px-5">
			<h2 class="text-3xl font-black"></h2>
			<button class="rounded-lg bg-brand px-4 py-2 text-brand-dark">
				Create An Event
			</button>
		</h2>
		<div
			class="scroll my-20 flex w-full flex-wrap items-center justify-center gap-8">
			<div
				class="event relative flex h-[140px] w-2/5 cursor-pointer flex-col items-center justify-center rounded-xl bg-brand-dark"
				v-for="(event, index) in Events"
				:key="index">
				<!-- :src="`/images/market/${market.image}`" -->
				<component
					:is="event.icon"
					class="event-icon mb-4 h-20 w-40 text-4xl font-thin text-brand">
				</component>
				<div
					class="event-title mx-auto w-2/3 text-center text-2xl font-medium text-gray-300">
					{{ event.title }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { shallowRef } from 'vue';
import {
	MegaphoneIcon,
	MicrophoneIcon,
	UserGroupIcon,
	UsersIcon,
} from '@heroicons/vue/24/outline';
const Events = shallowRef([
	{ title: 'Active Events', route: 'active', icon: MegaphoneIcon },
	{ title: 'Spaces', route: 'spaces', icon: MicrophoneIcon },
	{ title: 'Public Events', route: 'public', icon: UserGroupIcon },
	{ title: 'My Events', route: 'my-events', icon: UsersIcon },
]);
</script>

<style lang="scss" scoped>
.event{
	&:hover {
		@apply bg-gray-950;
		.event-icon {
			@apply text-gray-500;
		}
	}
}</style>
