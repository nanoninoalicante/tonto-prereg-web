<template>
  <div class="flex w-full flex-col">
    <ChooseHandleForm />
  </div>
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import { onMounted } from "vue";
definePageMeta({
  layout: "prereg",
});
const nuxtApp = useNuxtApp();
onMounted(() => {
  console.log(nuxtApp);
});
</script>
