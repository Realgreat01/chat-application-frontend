<template>
	<div
		@click="showOptions = !showOptions"
		class="scroll relative mb-2 flex h-12 w-full cursor-pointer items-center justify-between rounded p-4">
		<div class="flex w-full items-center justify-between">
			<h2 class="mx-4 text-3xl font-bold text-white">{{ title }}</h2>
			<p class="flex items-center">
				<span class="text-2xl capitalize text-brand">{{
					selectedOption.replace(/[-_]/g, ' ')
				}}</span>
				<span
					class="material-icons duration-500"
					style="font-size: 40px"
					:class="showOptions ? 'rotate-180' : ''">
					arrow_drop_down
				</span>
			</p>
		</div>
	</div>

	<div
		class="absolute bottom-[20rem] mx-auto h-60 w-1/2 overflow-y-scroll bg-brand-dark p-2"
		v-if="showOptions">
		<div class="sticky top-4 z-50 text-right">
			<div
				class="material-icons text-brand"
				@click="showOptions = false">
				cancel
			</div>
		</div>
		<!-- Array to lop through -->
		<div
			v-for="(option, index) in options"
			class="mt-2 cursor-pointer"
			:key="index">
			<input
				type="radio"
				:name="option"
				:id="option"
				:value="option"
				@change="showOptions = false"
				@input="$emit('update:selected', $event.target.value)"
				v-model="selectedOption"
				class="hidden" />

			<!-- Post label displayed -->

			<label
				:for="option"
				class="sticky top-0 flex items-center justify-between rounded bg-gray-900 p-2"
				:class="
					selectedOption === option ? 'bg-slate-100 text-brand-dark' : ''
				">
				<span class="justify-self-start text-2xl capitalize">{{
					option.replace(/[-_]/g, ' ')
				}}</span>

				<!-- Green checkbox -->

				<input
					v-if="selectedOption === option"
					type="checkbox"
					name="skills"
					class="mr-1 block h-6 w-6 rounded-full text-2xl text-brand"
					id=""
					checked />
			</label>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
const selectedOption = ref(props.options[0]);
const showOptions = ref(false);
const props = defineProps({
	options: { type: Array, required: true },
	title: { type: String, required: true },
	title: { type: String, required: true },
});
</script>

<style lang="scss" scoped></style>
