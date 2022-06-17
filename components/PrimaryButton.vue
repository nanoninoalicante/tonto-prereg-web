<template>
  <button
    class="font-heading absolute bottom-[15vh] inline-block cursor-pointer rounded-xl border-2 border-teal-500 bg-teal-800 p-4 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:opacity-50"
  >
    {{ text }}
  </button>
</template>
<script setup>
const props = defineProps(["text"]);
const text = props.text;
</script>
