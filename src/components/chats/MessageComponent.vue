<template>
	<div
		class="scroll flex w-full flex-col text-xl"
		v-if="messageIsSorted">
		<h2
			class="mx-auto my-3 rounded-3xl bg-gray-900 px-8 py-2 text-sm font-thin text-white"
			v-if="messages.length > 0">
			Conversation Stated
		</h2>

		<div>
			<div
				class="flex flex-col"
				v-for="(chat, index) in conversations"
				:key="index">
				<h2
					class="sticky top-2 z-50 mx-auto my-2 w-fit rounded-lg bg-brand px-6 py-1 text-base text-gray-900">
					{{ formatDate(index) }}
				</h2>
				<div
					v-for="message in chat"
					:key="message._id"
					class="relative mx-2 my-2 flex w-3/5 flex-col items-start rounded border border-gray-800 p-4"
					:class="message.sender._id === sender._id ? 'sender' : 'receiver'">
					<h2 class="text-2xl">{{ message.message }}</h2>
					<h3
						:class="
							message.sender._id !== sender._id
								? 'sender-time text-gray-800'
								: 'receiver-time text-gray-500'
						"
						class="text-base">
						{{ getTime(message.createdAt) }}
					</h3>
				</div>
			</div>
		</div>
	</div>

	<div
		class="flex h-full w-full flex-col items-center justify-center"
		v-else>
		<div class="spinner mx-auto h-40 w-40 bg-brand"></div>
	</div>
</template>

<script setup>
import { format } from 'timeago.js';
import { ref, toRefs, watchEffect } from 'vue';

const messageIsSorted = ref(false);
const chatBox = ref();
const conversations = ref([]);
const props = defineProps({
	messages: {
		type: Array,
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

const data = toRefs(props);
watchEffect(() => {
	const groupedMessages = {};
	for (let i = 0; i < data.messages.value.length; i++) {
		const dateStr = new Date(data.messages.value[i].createdAt).toDateString();
		if (!groupedMessages[dateStr]) groupedMessages[dateStr] = [];
		groupedMessages[dateStr].push(data.messages.value[i]);
	}
	conversations.value = groupedMessages;
	if (Object.keys(groupedMessages).length === data.messages.value.length)
		messageIsSorted.value = true;
});

const getTime = ISOdate => {
	const date = new Date(ISOdate);
	const time = date.toLocaleTimeString([], {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	return time;
};
const formatDate = dataString => {
	const date = new Date(dataString);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	const options = { day: 'numeric', month: 'long', year: 'numeric' };
	if (date.toDateString() === today.toDateString()) return 'Today';
	else if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
	else return date.toLocaleDateString('en-US', options);
};
</script>

<style scoped>
.sender {
	@apply self-end rounded-br-3xl rounded-tl-3xl bg-gray-900 text-gray-50;
}

.receiver {
	@apply self-start rounded-bl-3xl rounded-tr-3xl bg-brand bg-opacity-60 text-white;
}
.sender-time {
	@apply self-end;
}

.receiver-time {
	@apply self-end;
}
</style>
