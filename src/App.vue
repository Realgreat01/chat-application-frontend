<template>
	<RouterView />
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() =>
	/* Update the CSS variable with the status bar height using JavaScript */
	window.addEventListener('load', function () {
		const statusBarHeight = window.visualViewport.offsetTop;
		document.documentElement.style.setProperty(
			'--status-bar-height',
			`${statusBarHeight}px`
		);
	})
);
</script>
