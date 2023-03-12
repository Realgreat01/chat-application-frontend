<template>
	<div class="flex h-[10rem] flex-col items-center justify-evenly">
		<a href="https://github.com/Realgreat01" class="block" target="_blank">
			<img :src="githubIcon" alt="" class="block 	h-[1.4rem] md:h-[2rem]" />
		</a>
		<div class="mt-2 flex w-full items-center justify-center gap-x-4 justify-self-end">
			<routerLink
				:to="link"
				v-for="({title, link}, index) in footers"
				:key="index"
				class="flex gap-x-4 text-2xl text-gray-500">
				<ButtonComponent :text="title" />
				<span v-if="index !== footers.length - 1"> | </span>
			</routerLink>
		</div>
		<div class="text-xl text-gray-400">
			Some images used are from
			<a
				href="https://www.freepik.com/"
				class="text-pink-400"
				>Freepik</a
			>
		</div>

	</div>
</template>

<script setup>
import {ref} from 'vue';
import githubIcon from "@/components/icons/svgs/github-icon.svg"
import ButtonComponent from '../reusables/ButtonComponent.vue';
const footers = ref([
	{
		title: 'Privacy Policy',
		link: 'privacy-policy',
	},
	{
		title: 'Terms and Conditions',
		link: 'terms-and-conditions',
	},
]);
</script>

<style lang="scss" scoped></style>
