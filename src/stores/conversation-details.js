import {defineStore} from 'pinia';
import {ref} from 'vue';

export const ConversationStore = defineStore(
	'conversation',
	() => {
		const receiver = ref({});
		return {receiver};
	},
	{persist: true}
);

// export const ConversationStore = defineStore('store', {
// 	state: () => {
// 		return {
// 			receiver: {},
// 		};
// 	},
// 	persist: true,
// });
