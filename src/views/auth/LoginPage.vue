<template>
	<div
		class="fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-gray-800 p-10">
		<div
			class="mx-auto flex w-full flex-col items-center justify-center rounded-xl bg-brand-dark p-[2rem] md:w-1/3">
			<div class="relative w-full">
				<span
					style="top: 0; font-size: 2rem"
					class="material-icons absolute right-0 block cursor-pointer text-brand"
					@click="router.replace('/')"
					>cancel</span
				>
				<h1 class="mb-5 mt-10 text-center text-4xl font-bold text-brand">
					Log<span class="text-white">In</span>
				</h1>
				<form
					class="mx-auto mt-10 w-full p-2"
					@submit.prevent="signIn">
					<div
						v-for="(credential, index) in userCredentials"
						:key="index"
						class="my-4">
						<label
							:for="credential.value"
							class="mt-4 block text-3xl font-bold capitalize text-brand">
							{{ credential.title }}
						</label>
						<div class="relative">
							<input
								:type="credential.type"
								@focus="formError = undefined"
								:id="credential.value"
								:placeholder="'enter your ' + credential.title"
								:style="formError ? 'border: 1px solid red' : ''"
								:class="
									userDetails[credential.value]
										? 'border-brand'
										: ' border-gray-800'
								"
								v-model.trim="userDetails[credential.value]"
								class="relative block h-[4rem] w-full rounded border bg-transparent pl-4 p-2 text-3xl placeholder:lowercase focus:border-brand focus:outline-none focus:ring-transparent" />
							<div
								v-if="credential.value === 'password'"
								class="absolute top-3 cursor-pointer right-3 mr-10 flex">
								<span
									class="material-icons absolute top-1/2 "
									v-if="credential.type === 'password'"
									@click="credential.type = 'text'"
									>visibility
								</span>
								<span
									v-else
									class="material-icons absolute top-1/2 "
									@click="credential.type = 'password'"
									>visibility_off</span
								>
							</div>
						</div>
					</div>

					<p class="font-mono text-lg text-red-600">
						{{ formError }}
					</p>

					<div
						class="my-4 flex h-[5rem] w-full items-center justify-center rounded-lg bg-[#10965e] text-2xl font-bold hover:shadow-2xl hover:shadow-brand">
						<ButtonComponent
							text="Login"
							type="submit"
							:loading="loading"
							customClass="focus:scale-105"
							loadingText="Signing In ..." />
					</div>
					<div class="mx-auto mt-8 flex items-center justify-center gap-x-3 text-2xl">
						<p class="">Not a user</p>
						<router-link :to="{name: 'register'}">
							<p class="cursor-pointer text-brand text-opacity-70">
								Create Account
							</p></router-link
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref} from 'vue';
import Message from 'vue-m-message';
import axios from '@/axios';
import {useRouter} from 'vue-router';
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';

const router = useRouter();
const loading = ref(false);
const userDetails = ref({});

const formError = ref(undefined);

const userCredentials = ref([
	{
		title: 'Username',
		value: 'username',
		type: 'text',
	},
	{
		title: 'Password',
		value: 'password',
		type: 'password',
	},
]);

const signIn = async () => {
	try {
		loading.value = true;
			const {data} = await axios.post('/login', userDetails.value);
			const {token} = data;
			formError.value = '';
			Message.success('Login Successsful', {
				duration: 1000,
				position: 'top-right',
			});
			localStorage.setItem('auth-token', token);
			setTimeout(() => {
				router.replace({name: 'all-chats'});
			}, 1500);
	} catch (error) {
		formError.value = 'username or password incorrect';
	} finally {
		loading.value = false;
	}
};
</script>
