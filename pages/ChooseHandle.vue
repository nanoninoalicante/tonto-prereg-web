<template>
  <div class="flex w-full flex-col">
    <label
      class="mb-2 block text-lg font-medium tracking-tighter text-white"
      for="handle"
      >Choose Your New Handle</label
    >
    <input
      :class="general.inputClasses"
      type="text"
      id="handle"
      ref="handleInputRef"
      v-model="newHandles"
      placeholder="@realDonaldTrump"
    />
  </div>
</template>
<script setup>
import { useGeneral } from "../composables/general";
import party, { confetti } from "party-js";
import { ref, watch } from "vue";
const handleInputRef = ref(null);
const newHandles = ref("");
const general = useGeneral();
const focusIn = () => {
  confetti(handleInputRef.value, {
    count: party.variation.range(20, 40),
  });

  watch(newHandles, (newVal) => {
    console.log("typing: ", newVal);
  });
};
</script>
