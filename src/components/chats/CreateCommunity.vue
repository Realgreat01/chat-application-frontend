<template>
	<div
		class="mx-auto flex h-screen w-full flex-col items-end justify-end bg-transparent">
		<div class="mb-20 w-full rounded-t-xl bg-gray-900 p-4 pt-6">
			<div class="flex w-full items-center justify-between">
				<h2 class="my-4 text-3xl font-bold text-brand">Create New Community</h2>

				<button
					style="top: 0; font-size: 3rem"
					type="button"
					class="material-icons block cursor-pointer text-brand"
					@click="$emit('community_created')">
					cancel
				</button>
			</div>
			<form
				@submit.prevent="createCommunity"
				class="flex h-full w-full items-start gap-x-4 py-10">
				<div class="w-full px-10">
					<label
						for="group_name"
						class="my-2 block text-2xl font-bold capitalize text-brand"
						>Community Name</label
					>
					<input
						type="text"
						ref="form"
						id="group_name"
						placeholder="Community Name"
						v-model="group_name"
						class="scroll block w-full appearance-none rounded-xl border bg-transparent p-2 text-[16px] ring-transparent focus:border-brand focus:outline-none focus:ring-transparent" />
				</div>

				<div class="mt-8 flex h-60 flex-col justify-between">
					<button
						class="material-icons block"
						type="submit">
						<RiSendPlaneFill
							class="w-16 rotate-[5deg] fill-brand"
							:class="creatingCommunity ? 'animate-ping' : ''"
							:disabled="creatingCommunity" />
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

const emit = defineEmits(['community_created', 'update:selected']);
defineProps(['title']);

const group_name = ref('');
const form = ref(null);
const creatingCommunity = ref(false);
const category = ref('');
const group_privacy = ref(['public', 'private']);
const group_types = ref(['communication', 'announcements']);

const createCommunity = async () => {
	creatingCommunity.value = true;
	try {
		await axios.post('/community', {
			group_name: group_name.value,
		});
		group_name.value = '';
		Message.success('Community created successfully');
		emit('community_created');
	} catch (error) {
		Message.error('Unable to create community');
	} finally {
		creatingCommunity.value = false;
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
