<template>
	<div class="scroll bottom-20 mx-auto flex h-full flex-col text-sm">
		<div
			v-for="(message, index) in messages"
			:key="index"
			class="relative mx-2 my-2 flex w-3/5 flex-col items-start rounded border border-gray-600 p-2"
			:class="message.sender._id === sender._id ? 'sender' : 'receiver'">
			<h2 class="text-2xl">{{ message.message }}</h2>
			<h3
				:class="
					message.sender._id !== sender._id
						? 'sender-time text-white'
						: 'receiver-time text-gray-500'
				"
				class="">
				{{ format(message.createdAt) }}
			</h3>
		</div>
	</div>
</template>

<script setup>
import {format} from 'timeago.js';
import {ref} from 'vue';
defineProps({
	messages: {
		type: Object,
		required: true,
	},
	sender: {
		type: Object,
		required: true,
	},
	receiver: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped>
.sender {
	@apply self-end rounded-br-2xl rounded-tr-none bg-gray-800;
}

.receiver {
	@apply self-start bg-green-800 text-white;
}
.sender-time {
	@apply self-end;
}

.receiver-time {
	@apply self-end;
}
</style>
