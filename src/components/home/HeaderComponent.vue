<template>
  <div
    class="fixed top-0 z-20 right-0 p-10 flex w-full  items-center justify-between bg-gray-900"
  >
    <LogoIcon />
    <RouterLink
      :to="{ name: 'login' }"
      class="item-center h-[2.5rem] w-[8rem] rounded-xl border border-brand px-4 py-2 text-xl font-bold text-white md:h-[4rem] md:w-[14rem] md:text-4xl"
    >
      <ButtonComponent text="Login" custom-class="font-bold" />
    </RouterLink>
  </div>
</template>

<script setup>
import LogoIcon from "../icons/LogoIcon.vue";
import ButtonComponent from "../reusables/ButtonComponent.vue";
</script>

<style lang="scss" scoped></style>
