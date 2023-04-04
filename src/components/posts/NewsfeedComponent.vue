<template>
	<div class="mb-24">
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
				<div class="flex items-start gap-x-4">
					<img
						src="https://xsgames.co/randomusers/avatar.php?g=male"
						alt=""
						class="h-12 w-12 rounded-full" />
					<div class="flex flex-col">
						<h2 class="flex w-fit items-start justify-between gap-x-4">
							<div class="flex flex-col gap-x-3 overflow-x-hidden">
								<span class="font-bold"
									>{{ post.created_by.firstname }}
									{{ post.created_by.firstname }}</span
								>
								<span class="text-base text-gray-400"
									>@{{ post.created_by.username }}</span
								>
							</div>
							<span
								class="material-icons text-brand"
								style="font-size: 14px"
								v-if="post.created_by.verified"
								>verified</span
							>
						</h2>
						<p
							class="my-3 w-4/5 text-xl"
							v-html="convertToHTML(post.content)"></p>
					</div>
				</div>

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
			class="fixed bottom-24 mx-auto flex h-fit w-full items-center md:w-1/3">
			<span
				class="material-icons absolute right-8 self-end rounded-full bg-brand p-4">
				<PencilSquareIcon
					class="w-10"
					@click="createNewPost = true" />
			</span>
		</router-link>

		<div
			class="fixed bottom-0 z-50 mx-auto w-full md:w-1/3"
			v-if="createNewPost">
			<CreatePost @post_created="(createNewPost = false), getAllPost()" />
		</div>
	</div>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import CreatePost from './CreatePost.vue';
import axios from '@/axios';

const createNewPost = ref(true);

const convertToHTML = post => {
	const words = post.replace(/\n+/g, '\n').split('\n').join(' ').split(' ');
	let html = '<p>';
	for (var i = 0; i < words.length; i++) {
		if (words[i].startsWith('#')) {
			html +=
				'<span class="text-brand font-medium cursor-pointer">' +
				words[i] +
				'</span> ';
		} else {
			html += words[i] + ' ';
		}
	}
	html += '</p>';
	return html;
};

const NewsFeed = ref([]);

const getAllPost = async () => {
	const { data } = await axios.get('/get-post');
	NewsFeed.value = data;
	console.log(data);
};

const getIcon = icon => {
	switch (icon) {
		case 'housing':
			return 'apartment';
		case 'sports':
			return 'sports_soccer';
		default:
			return 'forum';
	}
};
onMounted(() => {
	getAllPost();
});
</script>

<style lang="scss" scoped></style>
<!-- {
		author: 'Samson Ikuomenisan',
		username: 'realgreat',
		verified: true,
		liked: true,
		category: 'housing',

		content: 'hello Everyone here is to new social media  hahahahaha',
		posted_by: 'Date.now',
	}, -->
