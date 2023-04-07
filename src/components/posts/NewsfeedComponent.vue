<template>
	<div class="mb-24">
		<div>
			<div
				class="relative m-4 my-6 h-fit rounded-xl bg-slate-900 p-4 text-2xl"
				v-for="post in state.NewsFeed"
				:key="post._id">
				<div
					class="material-icons absolute right-4 top-4 text-slate-500"
					style="font-size: 20px">
					{{ getIcon(post.category) }}
				</div>
				<div class="flex items-start gap-x-4">
					<img
						:src="post.created_by.profile_picture"
						alt=""
						class="h-12 w-12 rounded-full" />
					<div class="flex flex-col">
						<h2 class="flex w-fit items-start justify-between gap-x-4">
							<div class="flex flex-col gap-x-3 overflow-x-hidden">
								<span class="font-bold"
									>{{ post.created_by.firstname }}
									{{ post.created_by.lastname }}</span
								>
								<span class="text-xl text-gray-400"
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
							class="my-3 w-full text-xl"
							v-html="convertToHTML(post.content, post._id)"></p>
						<p :id="post._id"></p>
					</div>
				</div>

				<div
					class="mt-4 grid w-full grid-cols-[1fr,1fr,1fr,1.5fr] items-center justify-around">
					<p
						class="material-icons cursor-pointer text-center"
						style="font-size: 18px">
						reply
					</p>
					<p
						class="material-icons cursor-pointer text-center"
						style="font-size: 18px">
						share
					</p>
					<p
						@click="(post.liked = !post.liked), post.liked_by.length + 1"
						class="flex items-center justify-center gap-x-2">
						<span
							style="font-size: 16px"
							class="material-icons cursor-pointer"
							:class="post.liked ? 'text-red-600' : 'text-white'"
							>favorite</span
						>
						<span class="text-xl text-gray-400">{{
							post.liked
								? plugin.abbreviateNumber(post.liked_by.length + 1)
								: plugin.abbreviateNumber(post.liked_by.length)
						}}</span>
					</p>
					<div class="flex items-end justify-end gap-x-2">
						<div
							class="mt-1 text-center text-sm font-thin uppercase text-gray-300">
							{{ formatDate(post.createdAt) }}
						</div>
						<div
							class="mt-1 text-end text-sm font-thin uppercase text-gray-300">
							{{ formatTime(post.createdAt) }}
						</div>
					</div>
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
			<CreatePost
				@post_created="(createNewPost = false), state.getNewsFeed()" />
		</div>
	</div>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { plugin } from '@/plugins';
import CreatePost from './CreatePost.vue';
import { ConversationStore } from '@/stores/conversation-details.js';

const state = ConversationStore();

const createNewPost = ref(false);

const convertToHTML = (post, id) => {
	const pattern = /(\S+\.[^\s]+)/gi;

	// function replaceUrlsWithLinks(text) {
	// 	const replaceString = '<a href="$&">$&</a>';
	// 	return text.replace(pattern, replaceString);
	// }

	// const myString = 'Visit https://www.example.com or foo.bar!';
	// const replacedString = replaceUrlsWithLinks(myString);
	// console.log(replacedString);

	function replaceUrlsWithLinks(text) {
		// const matched = text.match(pattern);
		// const firstMatch = matched ? matched[0] : '';
		// // showLinkPreview(firstMatch, id);
		return text.replace(pattern, '<a href="$&" class="text-brand">$&</a>');
	}
	const parsedWords = replaceUrlsWithLinks(post);
	const words = parsedWords
		.split(/\n{2,}/)
		.map(word => word.replace('\n', '\n\n'));

	function formatString(str) {
		const hashtag = str.match(/#\S+/);
		const formattedStr = str.replace(
			hashtag,
			`<span class="text-brand font-medium cursor-pointer" onclick="alert('${hashtag}')">${hashtag}</span>`
		);
		return `<p>${formattedStr}</p>`;
	}
	const htmlString = words.map(formatString).join('');

	return htmlString;
};

const formatDate = date => {
	const dateToFormat = new Date(date);
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	const { format } = new Intl.DateTimeFormat('en-US', options);
	return format(dateToFormat);
};
const formatTime = time => {
	const timeToFormat = new Date(time);
	const timeString = timeToFormat.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	return timeString;
};

const getIcon = icon => {
	switch (icon) {
		case 'real-estates':
			return 'apartment';
		case 'real estates':
			return 'apartment';
		case 'sports':
			return 'sports_soccer';
		case 'nature':
			return 'spa';
		case 'finance':
			return 'account_balance';
		case 'politics':
			return 'gavel';
		default:
			return 'public';
	}
};

// async function showLinkPreview(url, id) {
// 	var linkPreviewDiv = document.getElementById(id);
// 	linkPreviewDiv.innerHTML = '<p>Loading link preview...</p>';

// 	try {
// 		const response = await fetch('https://opengraph.io/api/1.1/site/' + url);
// 		const data = await response.json();
// 		const title = data.hybridGraph.title;
// 		const description = data.hybridGraph.description;
// 		const image = data.hybridGraph.image;

// 		var linkPreviewHTML = '<h3>' + title + '</h3>';
// 		linkPreviewHTML += '<p>' + description + '</p>';
// 		linkPreviewHTML += '<img src="' + image + '">';

// 		linkPreviewDiv.innerHTML = linkPreviewHTML;
// 	} catch (error) {
// 		linkPreviewDiv.innerHTML =
// 			'<p>Error loading link preview: ' + error.message + '</p>';
// 	}
// }

onMounted(async () => {
	await state.getNewsFeed();
});
</script>

<style lang="scss" scoped></style>

<!-- for (var i = 0; i < words.length; i++) {
		if (words[i].startsWith('#')) {
			html +=
				'<span class="text-brand font-medium cursor-pointer" >' +
				words[i] +
				'</span> ';
		} else {
			html += words[i] + ' ';
		}
	}
	html += '</p>'; -->
