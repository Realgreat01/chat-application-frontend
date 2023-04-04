<template>
	<div
		class="relative top-0 left-0 z-50 flex min-h-screen w-screen items-center justify-center overflow-y-scroll bg-gray-900 p-5 md:p-10">
		<div class="mx-auto flex h-fit w-full rounded-xl p-[0rem] md:w-1/3">
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
							class="mt-6 block text-2xl font-bold capitalize text-brand"
							>{{ field.title.replaceAll('_', ' ') }}</label
						>
						<input
							class="relative block h-[4rem] w-full rounded border bg-transparent p-2 pl-4 text-2xl placeholder:lowercase focus:border focus:border-brand focus:outline-none focus:ring-transparent"
							:type="field.type"
							:style="serverError[field.title] ? 'border: 1px solid red' : ''"
							:class="
								UserCredentials[field.title]
									? 'border-brand'
									: 'border-gray-800'
							"
							@focus="serverError[field.title] = undefined"
							:placeholder="'Enter your ' + field.title.replaceAll('_', ' ')"
							v-model.trim="UserCredentials[field.title]" />

						<div class="font-mono text-xl text-red-500">
							{{ serverError[field.title] }}
						</div>
						<div
							v-if="field.title.includes('password')"
							class="absolute top-[4rem] right-3 mr-10 flex cursor-pointer">
							<span
								v-if="field.type === 'password'"
								@click="field.type = 'text'"
								class="material-icons absolute top-1/2"
								>visibility
							</span>
							<span
								v-else
								class="material-icons absolute top-1/2"
								@click="field.type = 'password'"
								>visibility_off</span
							>
						</div>
					</div>

					<!-- Gender -->
					<label class="mt-6 block text-3xl font-bold capitalize text-brand"
						>Gender</label
					>
					<div
						@click="showGender = !showGender"
						:class="
							serverError.gender && !UserCredentials.gender
								? 'bg-red-600'
								: 'bg-gray-900'
						"
						class="relative mb-2 flex h-12 w-full cursor-pointer items-center justify-between rounded p-4">
						<h2 class="mx-4 p-2 text-2xl">Choose Your Gender</h2>
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
									class="my-4 flex w-full justify-between rounded bg-gray-900 p-2"
									:class="
										UserCredentials.gender === gender
											? 'bg-slate-100 text-brand-dark'
											: ''
									">
									<span class="justify-self-start text-2xl capitalize">{{
										gender
									}}</span>
									<span v-if="UserCredentials.gender === gender">
										<input
											type="checkbox"
											name="skills"
											class="mr-1 block h-6 w-6 rounded-full text-2xl text-brand"
											id=""
											checked /></span
								></label>
							</div>
						</div>
					</div>
					<!--  -->
					<div
						class="my-6 flex h-[5rem] w-full items-center justify-center rounded-lg bg-[#10965e] text-2xl font-bold hover:shadow-2xl hover:shadow-brand">
						<ButtonComponent
							text="Create Account"
							type="submit"
							:loading="loading"
							customClass="focus:scale-105"
							loadingText="Creating Account" />
					</div>
					<div
						class="my-4 flex items-center justify-center gap-x-5 text-[1.5rem]">
						<p class="mx-1 block cursor-pointer text-white">
							Already have an Account?
						</p>

						<router-link :to="{ name: 'login' }">
							<p class="mx-1 block cursor-pointer text-brand">
								Login
							</p></router-link
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';
import Message from 'vue-m-message';
import ButtonComponent from '@/components/reusables/ButtonComponent.vue';

const router = useRouter();
const loading = ref(false);
const serverError = ref({});
const UserCredentials = ref({ password: '', confirm_password: '' });

const showGender = ref(false);
const genders = ref(['male', 'female', 'others']);

const forms = ref([
	{ title: 'firstname', type: 'text' },
	{ title: 'lastname', type: 'text' },
	{ title: 'email', type: 'text' },
	{ title: 'username', type: 'text' },
	{ title: 'password', type: 'password' },
	{ title: 'confirm_password', type: 'password' },
]);

const RegisterUser = async () => {
	if (
		UserCredentials.value.password?.length > 0 &&
		UserCredentials.value.confirm_password?.length > 0
	) {
		if (
			UserCredentials.value.password === UserCredentials.value.confirm_password
		) {
			try {
				serverError.value = {};
				loading.value = true;
				const { data } = await axios.post('/register', UserCredentials.value);
				localStorage.setItem('auth-token', data.token);
				router.push({ name: 'app' });
				serverError.value = {};
				Message.success('Login Successful');
			} catch (error) {
				if (error.name.includes('Axios')) {
					serverError.value = error.response.data;
				}
			} finally {
				loading.value = false;
			}
		} else {
			serverError.value = {};
			serverError.value = {
				password: 'password does not match',
				confirm_password: 'password does not match',
			};
		}

		// Check for no field
	} else {
		serverError.value = {};
		if (UserCredentials.value.password === '')
			serverError.value = Object.assign(serverError.value, {
				password: 'password is required',
			});
		if (UserCredentials.value.confirm_password === '')
			serverError.value = Object.assign(serverError.value, {
				confirm_password: 'confirm password is required',
			});
	}
};
</script>

<style lang="scss" scoped></style>
