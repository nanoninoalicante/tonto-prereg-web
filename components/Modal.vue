<template>
  <section
    v-if="showModal"
    class="fixed backdrop-blur-lg top-0 left-0 right-0 bottom-0 z-10 flex h-full w-full items-center overflow-y-auto bg-gray-800 bg-opacity-80 p-4"
  >
    <div class="m-auto w-full max-w-lg rounded-xl bg-white p-8">
      <FormSubmittedModal @accepted="modalAccepted" />
    </div>
  </section>
</template>
<script setup>
import { usePreReg } from "../composables/prereg";
import FormSubmittedModal from "./FormSubmittedModal";

const prereg = usePreReg();
const showModal = prereg.modal;
const modalAccepted = () => {
  showModal.value = null;
};
</script>
