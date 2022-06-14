<template>
  <div class="">
    <div class="relative mb-12 flex flex-col space-y-2">
      <label
        class="mb-2 block text-lg font-medium tracking-tighter text-white"
        for="handle"
        >Choose Your New Handle</label
      >
      <div
        class="relative flex items-center text-gray-600 focus-within:text-gray-800"
      >
        <CheckCircleIcon
          v-if="!newHandleError && newHandles"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-teal-800"
        ></CheckCircleIcon>
        <ExclamationCircleIcon
          v-if="newHandleError"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-red-800"
        ></ExclamationCircleIcon>
        <input
          class="w-full rounded-xl border-2 border-teal-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          type="text"
          id="handle"
          name="newHandleInput"
          ref="handleInputRef"
          v-model="newHandles"
          placeholder="@realDonaldTrump"
        />
      </div>

      <div
        v-if="newHandleError"
        class="absolute -bottom-10 right-0 flex items-center space-x-2 rounded-2xl bg-red-800 py-2 px-4 text-white"
      >
        <ExclamationCircleIcon
          class="h-4 w-4 text-white"
        ></ExclamationCircleIcon>
        <span class="text-sm">{{ newHandleError }}</span>
      </div>
    </div>
    <button
      :class="[
        'rounded-xl border-2 border-teal-500 bg-teal-800 p-4 text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:opacity-50',
      ]"
      :disabled="newHandleError || !newHandles"
      @click.once="reserveThisHandle"
    >
      Reserve this Handle
    </button>
  </div>
</template>
<script setup>
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { useField } from "vee-validate";
// import party, { confetti } from "party-js";
import { computed, onMounted, reactive, ref, watch } from "vue";
const route = useRoute();
const router = useRouter();
const { result, search } = useSearch("dev_users");
const handleInputRef = ref(null);

// SEARCH

const hasSearchMatches = ref(false);
const searchMatches = ref(null);

// VALIDATION

const searchResultMatchesInput = (inputName) => {
  if (!searchMatches.value || searchMatches.value.length === 0) return false;
  return searchMatches.value.some((hit) => hit.userName === inputName);
};

const newHandleIsRequired = (value) => {
  if (!value) {
    return "Choose your handle";
  }
  if (!value.slice(1)) {
    return "Choose your handle";
  }
  if (searchResultMatchesInput(value.slice(1))) {
    return "Sorry, this handle is taken";
  }
  return true;
};

const { value: newHandles, errorMessage: newHandleError } = useField(
  "newHandleInput",
  newHandleIsRequired
);

// const newHandles = ref(route.query?.handle || "");
const newHandleWithoutAt = computed(() =>
  newHandles.value ? newHandles.value.slice(1) : ""
);

watch(newHandleError, (newVal) => {
  console.log("newhandle error; ", newHandleError.value);
});

// METHODS

// const focusIn = () => {
//   confetti(handleInputRef.value, {
//     count: party.variation.range(20, 40),
//   });
// };

const reserveThisHandle = () => {
  return navigateTo({ path: "/handle/step-2/" + newHandles.value });
};

// HANDLE UPDATES

watch(newHandles, async (newHandleName) => {
  if (!newHandleName.startsWith("@")) {
    newHandles.value = "@" + newHandleName;
  }
  if (/\s/gi.test(newHandleName)) {
    newHandles.value = newHandleName.replaceAll(/\s/gi, "");
  }
  router.replace({ query: { handle: newHandleName } });
  await search({
    query: newHandleName.slice(1),
    requestOptions: { restrictSearchableAttributes: ["userName"] },
  }).then((r) => {
    searchMatches.value = r.hits;
  });
});

onMounted(() => {
  console.log("route: ", route.params?.handle);
  handleInputRef.value.focus();
});
</script>
