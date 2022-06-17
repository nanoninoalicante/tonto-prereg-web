<template>
  <div>
    <div class="flex flex-col items-center space-y-2">
      <button
        v-if="handle"
        class="box-shadow-xl m-4 flex items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl hover:bg-teal-700"
      >
        <span
          class="text-xl font-bold font-medium leading-7 tracking-tighter text-white"
          >{{ handle }}</span
        >
        <CheckCircleIcon
          class="pointer-events-none inline h-8 w-8 text-teal-400"
        ></CheckCircleIcon>
      </button>
    </div>
  </div>
</template>
<script setup>
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
const route = useRoute();
const handle = ref(route.params?.handle);
</script>
