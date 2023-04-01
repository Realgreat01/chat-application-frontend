<template>
	<div class="">
		<div>
			<div
				class="relative m-4 h-fit rounded-xl bg-slate-900 p-4 text-2xl"
				v-for="(post, index) in NewsFeed"
				:key="index">
				<div
					class="material-icons absolute right-4 top-4 text-slate-500"
					style="font-size: 20px">
					{{ getIcon(post.category) }}
				</div>
				<div class="flex items-center gap-x-4">
					<img
						src="https://xsgames.co/randomusers/avatar.php?g=male"
						alt=""
						class="h-12 w-12 rounded-full" />
					<h2 class="flex w-fit items-start justify-between gap-x-4">
						<div class="">
							<span class="block font-bold">{{ post.author }}</span>
							<span class="block text-gray-400">@{{ post.username }}</span>
						</div>
						<span
							class="material-icons text-brand"
							style="font-size: 16px"
							v-if="post.verified"
							>verified</span
						>
					</h2>
				</div>
				<p class="my-3 w-2/3 text-xl">{{ post.content }}</p>
				<div class="flex items-center justify-evenly">
					<p
						class="material-icons cursor-pointer"
						style="font-size: 16px"
						@click="post.liked = !post.liked"
						:class="post.liked ? 'text-red-600' : 'text-white'">
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
			class="fixed bottom-16 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-12 self-end rounded-full bg-brand p-4">
				<PencilSquareIcon class="w-10" />
			</span>
		</router-link>
	</div>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
const NewsFeed = ref([
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		verified: true,
		liked: true,
		category: 'housing',

		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		liked: false,
		verified: true,
		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		liked: true,
		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		liked: false,
		verified: true,
		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		category: 'sports',
		verified: false,
		liked: false,
		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		verified: true,
		liked: true,
		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
	{
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		liked: true,
		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	},
]);
const getIcon = icon => {
	switch (icon) {
		case 'housing':
			return 'apartment';
		case 'sports':
			return 'sports_soccer';
		default:
			return 'nature_people';
	}
};
</script>

<style lang="scss" scoped></style>
