<template>
  <div class="">
    <div class="relative flex flex-col space-y-2">
      <label
        class="mb-2 block text-lg font-medium tracking-tighter text-white"
        for="handle"
        >Choose Your New Handle</label
      >
      <div
        class="relative flex items-center text-gray-600 focus-within:text-gray-800"
      >
        <CheckCircleIcon
          v-if="!v$.newHandles.$invalid && newHandles.length > 2"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-teal-800"
        ></CheckCircleIcon>
        <ExclamationCircleIcon
          v-if="v$.newHandles.$invalid"
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

      <div class="flex flex-col space-y-1">
        <div
          v-if="v$.newHandles.$invalid"
          v-for="error in v$.newHandles.$silentErrors"
          :key="error.$uid"
          class="flex items-center space-x-2 rounded-2xl bg-red-800 py-2 px-4 text-white"
        >
          <ExclamationCircleIcon
            class="h-4 w-4 text-white"
          ></ExclamationCircleIcon>
          <span class="text-sm">{{ error.$message }}</span>
        </div>
      </div>
    </div>
    <button
      class="absolute bottom-[15vh]"
      :class="[
        'font-heading inline-block cursor-pointer rounded-xl border-2 border-teal-500 bg-teal-800 p-4 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:opacity-50',
      ]"
      :disabled="v$.newHandles.$invalid || newHandles.length < 2"
      @click.once="reserveThisHandle"
    >
      Reserve this Handle
    </button>
  </div>
</template>
<script setup>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/vue/solid";
// import party, { confetti } from "party-js";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const route = useRoute();
const router = useRouter();
const { result, search } = useSearch("dev_users");
const handleInputRef = ref(null);

// VALIDATION

const searchResultMatchesInput = (inputName, searchMatches) => {
  if (!searchMatches || searchMatches.length === 0) return false;
  return searchMatches.some((hit) => hit.userName === inputName);
};

const checkIfHandleExists = (value) => {
  return search({
    query: value.slice(1),
    requestOptions: { restrictSearchableAttributes: ["userName"] },
  }).then((r) => {
    return !searchResultMatchesInput(value.slice(1), r.hits);
  });
};

const newHandles = ref(route.query?.handle || "");
const requiredNameLength = ref(2);
const requiredNameMaxLength = ref(25);
const rules = computed(() => ({
  newHandles: {
    $lazy: false,
    isTaken: helpers.withMessage(
      "This handle is taken",
      helpers.withAsync(checkIfHandleExists)
    ),
    minLength: minLength(requiredNameLength.value),
    maxLength: maxLength(requiredNameMaxLength.value),
  },
}));
const v$ = useVuelidate(rules, { newHandles });
watch(v$, (newVal) => {
  console.log("validate: ", newVal.newHandles.isTaken);
});

// METHODS

// const focusIn = () => {
//   confetti(handleInputRef.value, {
//     count: party.variation.range(20, 40),
//   });
// };

const reserveThisHandle = () => {
  return navigateTo({ path: "/step-2/" + newHandles.value });
};

// HANDLE UPDATES

watch(newHandles, (newHandleName) => {
  if (!newHandleName.startsWith("@")) {
    newHandles.value = "@" + newHandleName;
  }
  if (/\s/gi.test(newHandleName)) {
    newHandles.value = newHandleName.replaceAll(/\s/gi, "");
  }
  router.replace({ query: { handle: newHandleName } });
});

onMounted(() => {
  console.log("route: ", route.params?.handle);
  handleInputRef.value.focus();
});
</script>
