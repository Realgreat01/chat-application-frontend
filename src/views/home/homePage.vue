<template>
	<div class="flex h-full flex-col justify-between px-10">
		<HeaderComponent />
		<div class="flex flex-col-reverse items-center md:grid md:grid-cols-[3fr,2fr]">
			<div class="flex w-full flex-col items-start justify-between">
				<InfoPage />
				<FeaturesComponent />
			</div>
			<AnimatedImage />
		</div>
		<FooterComponent />
	</div>
</template>

<script setup>
import AnimatedImage from '@/components/home/AnimatedImage.vue';
import FeaturesComponent from '@/components/home/FeaturesComponent.vue';
import HeaderComponent from '@/components/home/HeaderComponent.vue';
import InfoPage from '@/components/home/InfoPage.vue';
import FooterComponent from '../../components/home/FooterComponent.vue';
</script>

<style lang="scss" scoped></style>
