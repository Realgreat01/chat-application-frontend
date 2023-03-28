<template>
	<div class="flex h-screen w-full items-center justify-center">
		<main
			:class="class"
			class="skeleton-box"></main>
	</div>
</template>
<script setup>
defineProps({
	class: {
		type: String,
		default: 'h-20 rounded-full w-20',
	},
});
</script>

<style lang="scss" scoped>
.skeleton-box {
	position: relative;
	overflow: hidden;
	background-color: #e2e8f0;

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background-image: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0,
			rgba(255, 255, 255, 0.2) 20%,
			rgba(255, 255, 255, 0.5) 60%,
			rgba(255, 255, 255, 0)
		);
		animation: shimmer 3s infinite;
		content: '';
	}
}
@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}
</style>
