<template>
  <div
    class="fixed top-0 z-50 mx-auto flex h-[11rem] w-full items-center justify-between rounded-lg bg-brand p-4 pb-0 md:w-1/3"
  >
    <h2 class="my-10 text-6xl font-black">{{ headerText }}</h2>
    <div class="">
      <img
        :src="receiver.profile_picture"
        alt=""
        class="block h-20 w-20 rounded-full bg-gray-900"
        v-if="receiver.profile_picture"
      />
      <h2 class="material-icons cursor-pointer" style="font-size: 50px" v-else>
        account_circle
      </h2>
      <h2 class="w-full py-4 pr-8 text-right text-3xl text-gray-700">
        @{{ receiver.username }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ConversationStore } from "@/stores/conversation-details.js";
import { storeToRefs } from "pinia";
const props = defineProps({
  headerText: {
    type: String,
    required: true,
  },
  isPrivate: {},
});
const { receiver } = storeToRefs(ConversationStore());
</script>

<style lang="scss" scoped></style>
