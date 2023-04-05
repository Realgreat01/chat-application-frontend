<template>
	<div class="mx-auto bg-gray-800 py-4 text-xl font-normal md:w-2/5">
		<div class="mx-auto p-8">
			<div class="mb-10 flex items-center justify-between">
				<h1 class="mb-4 text-4xl font-bold">Privacy Policy</h1>
				<img
					:src="logoIcon"
					alt=""
					class="block h-[5rem] md:h-[6rem]" />
			</div>
			<p class="mb-4">
				Syntrix takes user privacy seriously and is committed to protecting the personal
				information of its users. This Privacy Policy outlines the types of information
				collected by Syntrix, how that information is used and safeguarded, and the
				choices users have regarding their personal data. By using Syntrix, users consent
				to the collection and use of their personal information as outlined in this Privacy
				Policy.
			</p>
			<h2 class="mb-2 text-3xl font-bold">Information Collection and Use</h2>
			<p class="mb-4">
				Syntrix may collect personal information such as name, email address, and location
				information. This information is collected when a user registers for an account,
				updates their profile, or uses Syntrix's messaging or other features. Syntrix
				uses this information to personalize user experience, provide customer support, and
				offer relevant services. Syntrix will not share user data with third parties for
				marketing purposes without the user's explicit consent.
			</p>
			<h2 class="mb-2 text-3xl font-bold">Security and Data Retention</h2>
			<p class="mb-4">
				Syntrix takes appropriate measures to protect user data from unauthorized access,
				disclosure, alteration, or destruction. This includes using industry-standard
				encryption, firewalls, and access controls. Syntrix will retain user data for as
				long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a
				longer retention period is required by law. Users can request the deletion of their
				personal information at any time by contacting Syntrix's customer support.
			</p>
		</div>
		<RouterLink
			class="bg-gray-90 0 mx-auto block w-[10rem] p-4 text-brand shadow-2xl shadow-brand"
			to="/">
			<ButtonComponent text=" Go Home"
		/></RouterLink>
	</div>
</template>

<script setup>
import logoIcon from '/logo.svg';
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';
</script>

<style lang="scss" scoped></style>
