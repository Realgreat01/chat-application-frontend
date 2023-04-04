<template>
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

<style lang="scss" scoped></style>

<!-- import SkeletonLoader from '@/components/chats/SkeletonLoader.vue'; -->
