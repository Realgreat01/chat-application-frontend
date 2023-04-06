<template>
	<div
		class="mx-auto flex h-screen w-full flex-col items-end justify-end bg-transparent">
		<div class="mb-20 w-full rounded-t-xl bg-gray-900 p-4 pt-6">
			<div class="flex w-full items-center justify-between">
				<h2 class="my-4 text-3xl font-bold text-brand">Create New Post</h2>

				<button
					style="top: 0; font-size: 3rem"
					type="button"
					class="material-icons block cursor-pointer text-brand"
					@click="$emit('post_created')">
					cancel
				</button>
			</div>
			<form
				@submit.prevent="createPost"
				class="flex h-full w-full items-start gap-x-4 py-10">
				<div class="w-full">
					<SelectComponent
						v-model:selected="category"
						@update:selected="selected => (category = selected)"
						:options="categories"
						title="Post Catergory" />
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
						<RiSendPlaneFill
							class="w-16 rotate-[5deg] fill-brand"
							:class="creatingPost ? 'animate-ping' : ''"
							:disabled="creatingPost" />
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RiSendPlaneFill } from 'vue-remix-icons';
import SelectComponent from '@/components/reusables/SelectComponent.vue';
import axios from '@/axios';
import Message from 'vue-m-message';

const emit = defineEmits(['post_created', 'update:selected']);
defineProps(['title']);

const content = ref('');
const form = ref(null);
const creatingPost = ref(false);
const category = ref('');
const categories = ref([
	'general',
	'sports',
	'nature',
	'real-estates',
	'finance',
	'politics',
]);

const createPost = async () => {
	creatingPost.value = true;
	try {
		await axios.post('/create-post', {
			content: content.value,
			category: category.value,
		});
		content.value = '';
		Message.success('Post created successfully');
		emit('post_created');
	} catch (error) {
		Message.error('Unable to create post');
	} finally {
		creatingPost.value = false;
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
