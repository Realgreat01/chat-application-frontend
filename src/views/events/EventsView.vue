<template>
	<div></div>
</template>

<script setup>
import { ref } from 'vue';

const Events = ref([
	{ title: 'Active Events', route: 'active', image: '' },
	{ title: 'Spaces', route: 'spaces', image: '' },
	{ title: 'Public Events', route: 'public', image: '' },
	{ title: 'My Events', route: 'my-events', image: '' },
]);
</script>

<style lang="scss" scoped></style>
