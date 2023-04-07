<template>
	<div
		class="scroll mx-auto flex h-screen w-full flex-col rounded-t-lg border-y-transparent bg-gray-900 transition delay-150 ease-in-out">
		<h2 class="sticky top-0 z-50 rounded-xl bg-brand p-8 text-6xl font-bold">
			Settings
		</h2>

		<div class="flex h-full w-full items-center justify-center">
			<div class="w-full p-6">
				<div
					class="setting m-2 mt-0 flex w-full cursor-pointer items-center gap-x-4 rounded-xl p-2 hover:bg-brand"
					v-for="(setting, index) in settings"
					:class="
						setting.title === 'Log Out'
							? 'bg-red-950 hover:bg-slate-800'
							: 'bg-brand-dark'
					"
					@click="setting.action"
					:key="index">
					<component
						:class="setting.title === 'Log Out' ? 'fill-red-400 ' : ''"
						:is="setting.icon"
						class="icon h-12 w-12 text-brand" />
					<h2 class="text-xl">{{ setting.title }}</h2>
				</div>
			</div>
		</div>

		<footer class="mx-auto flex items-center justify-center gap-x-5">
			<div
				class="mx-auto flex items-center gap-x-2 text-center text-lg text-gray-400">
				<span class="">&copy; </span>
				<span class="">{{ new Date().getFullYear() }}</span>
			</div>

			<div
				class="mx-auto flex items-center gap-x-4 text-center text-xl text-gray-400">
				<span class="">Syntrix Inc</span>
			</div>
		</footer>
	</div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
	UserIcon,
	LockClosedIcon,
	UserCircleIcon,
	ShieldCheckIcon,
	HeartIcon,
	DocumentCheckIcon,
	AdjustmentsHorizontalIcon,
	DocumentIcon,
} from '@heroicons/vue/24/outline';
import { RiLogoutBoxLine, RiLogoutBoxRLine } from 'vue-remix-icons';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid';

const router = useRouter();

const settings = shallowRef([
	{
		title: 'Profile',
		action: () => router.push({ name: 'user' }),
		icon: UserCircleIcon,
	},
	{
		title: 'Posts',
		action: () => {},
		icon: DocumentIcon,
	},
	{
		title: 'Update Basic Details',
		action: () => {},
		icon: AdjustmentsHorizontalIcon,
	},
	{
		title: 'Preferences',
		action: () => {},
		icon: HeartIcon,
	},
	{
		title: 'Change Password',
		action: () => {},
		icon: LockClosedIcon,
	},
	{
		title: 'Terms and Conditions',
		action: () => {},
		icon: DocumentCheckIcon,
	},
	{
		title: 'Privacy Policy',
		action: () => {},
		icon: ShieldCheckIcon,
	},
	{
		title: 'Log Out',
		action: () => {},
		icon: ArrowRightOnRectangleIcon,
	},
]);
</script>

<style lang="scss" scoped>
.setting {
	&:hover {
		.icon {
			@apply text-white;
		}
	}
}
</style>
