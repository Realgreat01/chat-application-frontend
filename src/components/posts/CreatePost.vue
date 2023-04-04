<template>
	<div
		class="mx-auto flex h-screen w-full flex-col items-end justify-end bg-transparent">
		<div class="w-full rounded-t-xl bg-gray-900 p-4 pt-6">
			<h2 class="my-4 text-3xl font-bold text-brand">Create New Post</h2>
			<form
				@submit.prevent="createPost"
				class="flex h-full w-full items-start gap-x-4 py-10">
				<div class="w-full">
					<div class="grid w-full grid-cols-2 items-center">
						<h2 class="text-2xl font-semibold">Post Catergory :</h2>
						<select
							name=""
							v-model="category"
							class="mb-3 w-full rounded-xl border-none bg-gray-800 px-4 py-2 text-2xl focus:border-none focus:outline-none focus:ring-transparent disabled:text-white"
							id="">
							<option
								class="bg-gray-900 text-xl hover:bg-brand"
								v-for="(category, index) in categories"
								:value="category"
								:disabled="index === 0"
								:selected="index === 1"
								:key="index">
								{{ category }}
							</option>
						</select>
					</div>
					<textarea
						type="text"
						ref="form"
						placeholder="Create New Post "
						v-model="content"
						class="scroll block h-60 w-full appearance-none rounded-xl border bg-transparent p-5 text-[16px] ring-transparent focus:border-brand focus:outline-none focus:ring-transparent">
					</textarea>
				</div>

				<div class="mt-8 flex h-60 flex-col justify-between">
					<button
						class="material-icons block"
						type="submit">
						<RiSendPlaneFill class="w-16 rotate-[5deg] fill-brand" />
					</button>

					<button
						style="top: 0; font-size: 2rem"
						type="button"
						class="material-icons block cursor-pointer text-brand"
						@click="$emit('post_created')">
						cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RiSendPlaneFill } from 'vue-remix-icons';
import axios from '@/axios';
import Message from 'vue-m-message';

const emit = defineEmits('post_created');
const content = ref('');
const form = ref(null);

const category = ref('');
const categories = ref([
	'Please select post category',
	'general',
	'sports',
	'nature',
	'real estates',
	'finance',
	'politics',
]);

const createPost = async () => {
	try {
		await axios.post('/create-post', {
			content: content.value,
			category: category.value,
		});
		content.value = '';
		Message.success('Post created successfully');
		emit(['post_created']);
	} catch (error) {
		console.log(error);
	}
};

onMounted(() => {
	form.value.focus();
	document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
	document.body.style.overflow = 'visible';
});
</script>

<style lang="scss" scoped></style>
