<template>
  <div class="scroll flex w-full flex-col text-sm" v-show="messageIsSorted">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="relative mx-2 my-2 flex w-3/5 flex-col items-start rounded border border-gray-800 p-4"
      :class="message.sender._id === sender._id ? 'sender' : 'receiver'"
    >
      <h2 class="text-2xl">{{ message.message }}</h2>
      <h3
        :class="
          message.sender._id !== sender._id
            ? 'sender-time text-white'
            : 'receiver-time text-gray-500'
        "
        class=""
      >
        {{ format(message.createdAt) }}
      </h3>
    </div>
  </div>
</template>

<script setup>
import { format } from "timeago.js";
import { ref, onMounted } from "vue";

const messageIsSorted = ref(false);
const chatBox = ref();
defineProps({
  messages: {
    type: Object,
    required: true,
  },
  sender: {
    type: Object,
    required: true,
  },
  receiver: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  setTimeout(() => {
    messageIsSorted.value = true;
  }, 1000);
});
</script>

<style scoped>
.sender {
  @apply self-end rounded-tl-3xl rounded-br-3xl bg-gray-900 text-gray-50;
}

.receiver {
  @apply self-start rounded-bl-3xl rounded-tr-3xl bg-brand bg-opacity-60 text-white;
}
.sender-time {
  @apply self-end;
}

.receiver-time {
  @apply self-end;
}
</style>
