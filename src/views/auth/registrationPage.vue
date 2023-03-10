<template>
	<div
		class="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 p-5 md:p-10">
		<div class="mx-auto flex h-fit w-full rounded p-[0rem] md:w-1/3">
			<div
				class="relative h-fit w-full flex-col items-center justify-center bg-brand-dark shadow-xl">
				<span
					style="top: 0; font-size: 2rem"
					class="material-icons absolute right-4 m-4 block cursor-pointer text-brand"
					@click="router.replace('/')"
					>cancel</span
				>
				<h1 class="mb-5 mt-10 text-center text-4xl font-bold text-brand">
					Create <span class="text-white">Account</span>
				</h1>
				<form
					@submit.prevent="RegisterUser"
					class="mx-auto flex w-full flex-col justify-evenly rounded py-10 px-5 shadow-lg md:w-[40rem] md:px-20">
					<div
						v-for="(field, index) in forms"
						:key="index"
						class="relative">
						<label
							:for="field.title"
							class="mt-4 block text-xl font-bold capitalize text-brand"
							>{{ field.title.replaceAll('_', ' ') }}</label
						>
						<input
							class="relative block w-full rounded border bg-transparent p-2 text-xl placeholder:lowercase"
							:type="field.type"
							:style="
								serverError[field.title]
									? 'border: 1px solid red'
									: 'border: 1px solid green'
							"
							:class="
								UserCredentials[field.title] === '' ? '' : 'border border-brand'
							"
							@focus="serverError[field.title] = undefined"
							:placeholder="'Enter your ' + field.title.replaceAll('_', ' ')"
							v-model="UserCredentials[field.title]" />

						<div class="font-mono text-xl text-red-500">
							{{ serverError[field.title] }}
						</div>
						<div
							v-if="field.title.includes('password')"
							class="absolute top-[3rem] right-3 flex cursor-pointer pr-10">
							<span
								v-if="field.type === 'password'"
								@click="field.type = 'text'"
								class="material-icons"
								>visibility
							</span>
							<span
								v-else
								class="material-icons"
								@click="field.type = 'password'"
								>visibility_off</span
							>
						</div>
					</div>

					<!-- Gender -->
					<!-- Gender -->
					<label class="mt-4 block text-xl font-bold capitalize text-brand">Gender</label>
					<div
						@click="showGender = !showGender"
						:class="
							serverError.gender && !UserCredentials.gender
								? 'bg-red-600'
								: 'bg-gray-500'
						"
						class="relative my-4 flex h-12 w-full cursor-pointer items-center justify-between rounded">
						<h2 class="mx-2">Choose Your Gender</h2>
						<i
							class="material-icons duration-500"
							style="font-size: 34px"
							:class="showGender ? 'rotate-180' : ''">
							arrow_drop_down</i
						>
					</div>
					<div
						class="font-mono text-xl text-red-500"
						v-if="serverError.gender && !UserCredentials.gender">
						{{ serverError.gender }}
					</div>
					<div
						class=""
						v-if="showGender">
						<div class="scroll mt-2 mb-2 h-fit pr-1 duration-1000">
							<div
								v-for="(gender, index) in genders"
								:key="index">
								<input
									type="radio"
									:name="gender"
									:id="gender"
									:value="gender"
									v-model="UserCredentials.gender"
									class="hidden" />
								<label
									:for="gender"
									class="my-2 flex w-full justify-between rounded bg-[#161817] p-2"
									:class="
										UserCredentials.gender === gender
											? 'bg-slate-100 text-brand-dark'
											: ''
									">
									<span class="justify-self-start text-xl capitalize">{{
										gender
									}}</span>
									<span v-if="UserCredentials.gender === gender">
										<input
											type="checkbox"
											name="skills"
											class="mr-1 block h-6 w-6 rounded-full text-brand"
											id=""
											checked /></span
								></label>
							</div>
						</div>
					</div>
					<!--  -->
					<div
						class="my-4 flex h-[3.5rem] w-full items-center justify-center rounded bg-brand text-3xl font-bold">
						<ButtonComponent
							text="Create Account"
							type="submit"
							:loading="loading"
							loadingText="Creating Account" />
					</div>
					<div class="my-4 flex items-center justify-center gap-x-5 text-[1rem]">
						<p class="mx-1 block cursor-pointer text-white">Already have an Account?</p>

						<router-link :to="{name: 'login'}">
							<p class="mx-1 block cursor-pointer text-brand">Login</p></router-link
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref} from 'vue';
import axios from '@/axios';
import {useRouter} from 'vue-router';
import Message from 'vue-m-message';
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';

const router = useRouter();
const loading = ref(false);
const serverError = ref({});
const UserCredentials = ref({gender: ''});

const showGender = ref(false);
const genders = ref(['male', 'female', 'others']);

const forms = ref([
	{title: 'firstname', type: 'text'},
	{title: 'lastname', type: 'text'},
	{title: 'email', type: 'text'},
	{title: 'username', type: 'text'},
	{title: 'password', type: 'password'},
	{title: 'confirm_password', type: 'password'},
]);

const RegisterUser = async () => {
	console.log(UserCredentials.value);

	if (UserCredentials.value.password === UserCredentials.value.confirm_password) {
		try {
			serverError.value = {};
			loading.value = true;
			sessionStorage.removeItem('auth-token');
			const {data} = await axios.post('/register', UserCredentials.value);
			sessionStorage.setItem('auth-token', data.token);
			console.log(data);
			router.push({name: 'all-chats'});
			serverError.value = {};
			Message.success('Login Successful');
		} catch (error) {
			if (error.name.includes('Axios')) {
				serverError.value = error.response.data;
				console.log(serverError.value);
			}
		} finally {
			loading.value = false;
		}
	} else {
		serverError.value.confirm_password = 'password does not match';
		serverError.value.password = 'password does not match';
	}
};
</script>

<style lang="scss" scoped></style>
