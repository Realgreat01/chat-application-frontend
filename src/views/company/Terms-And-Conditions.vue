<template>
	<div class="mx-auto bg-gray-800 py-4 text-xl font-normal md:w-2/5">
		<div class="mx-auto p-8">
			<div class="mb-10 flex items-center justify-between">
				<h1 class="mb-4 text-5xl font-bold">Terms and Conditions</h1>
				<img
					:src="logoIcon"
					alt=""
					class="block h-[5rem] md:h-[6rem]" />
			</div>
			<h2 class="mb-4 text-3xl font-bold">Introduction</h2>
			<p class="mb-4">
				These Terms and Conditions ("Terms") govern the use of Buzz Chat, a social media
				application developed and owned by Buzz Chat. By using Buzz Chat, you agree to be
				bound by these Terms. If you do not agree to these Terms, you may not use Buzz Chat.
			</p>
			<h2 class="mb-4 text-3xl font-bold">User Conduct</h2>
			<p class="mb-4">
				Users of Buzz Chat are solely responsible for their own conduct and content shared
				through the application. Users agree not to use Buzz Chat for any illegal or
				unauthorized purposes and to comply with all local, state, and federal laws. Users
				also agree not to harass, intimidate, or threaten other users, or engage in any
				other behavior that violates the rights of others.
			</p>
			<h2 class="mb-4 text-3xl font-bold">Intellectual Property</h2>
			<p class="mb-4">
				Buzz Chat and its contents, including but not limited to graphics, images, logos,
				and text, are the intellectual property of Buzz Chat and are protected by copyright,
				trademark, and other laws. Users may not reproduce, distribute, or modify any
				portion of Buzz Chat without the express written permission of Buzz Chat.
			</p>
			<h2 class="mb-4 text-3xl font-bold">Liability</h2>
			<p class="mb-4">
				Buzz Chat is not responsible for any damages, direct or indirect, arising from the
				use of Buzz Chat. Buzz Chat is provided "as is" without warranty of any kind, either
				express or implied, including but not limited to warranties of merchantability,
				fitness for a particular purpose, and non-infringement. Buzz Chat is not responsible
				for any content posted by users, and is not liable for any errors or omissions in
				such content. Users use Buzz Chat at their own risk.
			</p>
			<!-- Add additional paragraphs here as needed -->
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
