<template>
	<div class="">
		<div>
			<div
				class="m-4 h-fit rounded-xl bg-gray-800 p-4 text-2xl"
				v-for="(post, index) in NewsFeed"
				:key="index">
				<img
					src="https://xsgames.co/randomusers/avatar.php?g=male"
					alt=""
					class="h-10 w-10 rounded-full" />
				<h2 class="flex w-fit items-center justify-between gap-x-4">
					<span class="block font-bold">{{ post.author }}</span>
					<span class="block text-gray-400">@{{ post.username }}</span>
				</h2>
				<p class="my-3 w-2/3 text-xl">{{ post.content }}</p>
				<div class="flex items-center justify-evenly">
					<p
						class="material-icons cursor-pointer"
						style="font-size: 16px">
						favorite
					</p>
					<p
						class="material-icons cursor-pointer"
						style="font-size: 16px">
						reply
					</p>
					<p
						class="material-icons cursor-pointer"
						style="font-size: 16px">
						share
					</p>
				</div>
			</div>
		</div>
		<router-link
			:to="{ name: '' }"
			style="font-size: 30px"
			class="fixed bottom-16 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span class="material-icons absolute right-12 self-end">
				<PencilSquareIcon class="w-14" />
			</span>
		</router-link>
	</div>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import NewsFeed from '@/data/newsfeed.json';
</script>

<style lang="scss" scoped></style>
