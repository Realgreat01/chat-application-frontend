<!-- <template>
	<div>
		<EmojiPicker
			class="text-brand-darkbg-transparent rounded-xl text-sm"
			placeholder="Enter Message"
			theme="dark"
			:text="text"
			picker-type="textarea"
			:disable-sticky-group-names="true"
			:disable-skin-tones="true"
			:display-recent="true"
			@select=""
			@update:text="onChangeText" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
const text = ref('this is the text');
function onChangeText(new_text) {
	text.value = new_text || '';
}
</script>

<style lang="scss" scoped></style> -->

<!-- import SkeletonLoader from '@/components/chats/SkeletonLoader.vue'; -->

<template>
	<div>
		<div class="wrapper">
			<div class="top"><!-- Content for the top div --></div>
			<div class="middle">
				<ul class="chat">
					<!-- Messages go here -->
				</ul>
			</div>
			<div class="bottom"><!-- Content for the bottom div --></div>
		</div>
	</div>
</template>

<script setup>
function hello() {
	const chatList = document.querySelector('.chat');
	const messageInput = document.querySelector('.message-input');
	function addMessage(message) {
		const li = document.createElement('li');
		li.textContent = message;
		chatList.appendChild(li); // Scroll the middle div to the bottom of the chat
		chatList.scrollTo(0, chatList.scrollHeight);
	}
	messageInput.addEventListener('keydown', function (event) {
		if (event.key === 'Enter' && messageInput.value.trim() !== '') {
			addMessage(messageInput.value.trim());
			messageInput.value = '';
		}
	});
}
</script>

<style lang="scss" scoped></style>
