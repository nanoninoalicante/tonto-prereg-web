<template>
  <div
    class="bg-green-100 mb-4 flex h-10 w-10 items-center justify-center rounded-md"
  >
    <ThumbsUp class="text-5xl" />
  </div>
  <h3 class="mb-2 text-2xl font-semibold text-gray-900">Modal success</h3>
  <p class="mb-6 text-sm font-medium text-gray-500">
    This section has been published sucessfully.
  </p>
  <div class="-m-2 flex flex-wrap justify-end">
    <div class="w-full p-2 md:w-1/2">
      <button
        class="shadow-button flex w-full flex-wrap justify-center rounded-md border border-gray-200 bg-white px-4 py-2.5 text-base font-medium text-gray-500 hover:border-gray-300 hover:text-gray-600"
      >
        <p>Cancel</p>
      </button>
    </div>
    <div class="w-full p-2 md:w-1/2">
      <a
        class="font-heading mr-4 mb-2 inline-block w-full cursor-pointer rounded-xl bg-blue-500 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 lg:mb-0"
        @click="accept"
        >Got It</a
      >
    </div>
  </div>
</template>
<script setup>
import ThumbsUp from "./ThumbsUp";
const emit = defineEmits(["accepted"]);
const accept = () => {
  emit("accepted");
};
</script>
