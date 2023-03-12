<template>
  <div class="my-10 flex w-full flex-col items-center md:my-5 md:flex-row">
    <div
      class="m-4 w-[90%] rounded-full border px-6 py-2 text-3xl font-bold text-white shadow-2xl shadow-brand md:w-[24rem]"
      v-for="(button, index) in buttons"
      :key="index"
      :class="
        index === 0
          ? 'border-transparent bg-[#12c256]'
          : 'border-brand text-brand'
      "
    >
      <ButtonComponent
        custom-class="font-bold"
        @click="router.push({ name: 'all-chats' })"
        :text="button"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ButtonComponent from "../reusables/ButtonComponent.vue";
import { ref } from "vue";

const router = useRouter();
const buttons = ref(["Chat With Friends", "Join Local Community"]);
</script>

<style lang="scss" scoped>
.txt {
  color: rgb(1, 90, 1) n;
}
</style>
