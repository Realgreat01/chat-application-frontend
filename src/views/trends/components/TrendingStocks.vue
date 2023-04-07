<template>
	<div></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const topStocks = ref([]);
onMounted(async () => {
	try {
		const response = await axios.get(
			import.meta.env.VITE_ALPHA_VINTAGE_API_URL,
			{
				params: {
					// function: 'TIME_SERIES_INTRADAY',
					// symbol: 'IBM',
					// market: 'US',
					function: 'TOPS',
					market: 'US',
					// interval: '5min',
					apikey: import.meta.env.VITE_ALPHA_VINTAGE_API_KEY,
				},
			}
		);

		topStocks.value = response;
		console.log(topStocks.value);
	} catch (error) {
		console.log(error);
	}
});
</script>

<style lang="scss" scoped></style>
