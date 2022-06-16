<template>
  <div class="">
    <div class="flex flex-col items-center space-y-2">
      <label
        class="mb-2 block w-full text-left text-lg font-medium tracking-tighter text-white"
        for="handle"
        >Choose Your New Handle</label
      >
      <div
        class="relative flex w-full items-center text-gray-600 focus-within:text-gray-800"
      >
        <CheckCircleIcon
          v-if="!formIsInvalid && v$.newHandles.$dirty"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-teal-800"
        ></CheckCircleIcon>
        <ExclamationCircleIcon
          v-if="v$.newHandles.$invalid"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-warning-500"
        ></ExclamationCircleIcon>
        <input
          class="w-full rounded-xl border-2 border-teal-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          :class="{ 'border-warning-500': formIsInvalid }"
          type="text"
          id="handle"
          name="newHandleInput"
          ref="handleInputRef"
          v-model="v$.newHandles.$model"
          placeholder="@elonmusk"
          v-on:keydown.enter="reserveThisHandle"
        />
      </div>

      <div class="flex w-full flex-col space-y-1">
        <TransitionGroup
          v-if="v$.newHandles.$invalid"
          name="fade"
          tag="div"
          mode="in-out"
        >
          <div
            v-for="error in v$.newHandles.$silentErrors"
            :key="error.$uid"
            class="flex items-center space-x-2 rounded-2xl bg-warning-500 py-2 px-4 text-white"
          >
            <ExclamationCircleIcon
              class="h-6 w-6 text-white"
            ></ExclamationCircleIcon>
            <span
              class="text-md font-bold font-medium leading-7 tracking-tighter"
              >{{ error.$message }}</span
            >
          </div>
        </TransitionGroup>
        <Transition name="fade" mode="in-out">
          <div
            v-if="!v$.newHandles.$invalid && v$.newHandles.$dirty"
            class="flex items-center space-x-2 rounded-2xl bg-teal-500 py-2 px-4 text-white"
          >
            <span class="mr-1 text-xl">&#128077;</span>
            <span
              class="text-md font-bold font-medium leading-7 tracking-tighter"
              >That's good lookin' handle!</span
            >
          </div>
        </Transition>
      </div>
    </div>
    <button
      class="absolute bottom-[15vh]"
      :class="[
        'font-heading inline-block cursor-pointer rounded-xl border-2 border-teal-500 bg-teal-800 p-4 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400 disabled:opacity-50',
      ]"
      :disabled="formIsInvalid"
      @click.once="reserveThisHandle"
    >
      Reserve this Handle
    </button>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
const route = useRoute();
const router = useRouter();
const indices = ["dev_preregisteredusers", "dev_users"];
const algolia = useAlgolia();
const handleInputRef = ref(null);

// VALIDATION

const searchResultMatchesInput = (inputName, searchMatches) => {
  if (!searchMatches || searchMatches.length === 0) return false;
  return searchMatches.some((hit) => hit.userName === inputName);
};

const checkIfHandleExists = (value) => {
  const queries = indices.map((index) => {
    return {
      indexName: index,
      query: value.slice(1),
      params: {
        hitsPerPage: 3,
        restrictSearchableAttributes: ["userName"],
      },
    };
  });
  return algolia.multipleQueries(queries).then(({ results }) => {
    const concatenatedResults = [].concat.apply(
      [],
      results.map((result) => result.hits)
    );
    console.log("search results: ", concatenatedResults);
    return !searchResultMatchesInput(value.slice(1), concatenatedResults);
  });
};

const newHandles = ref(route.query?.handle || "");
const requiredNameLength = ref(2);
const requiredNameMaxLength = ref(25);
const rules = computed(() => ({
  newHandles: {
    $lazy: true,
    isTaken: helpers.withMessage(
      "This handle is taken",
      helpers.withAsync(checkIfHandleExists)
    ),
    required,
    minLength: minLength(requiredNameLength.value),
    maxLength: maxLength(requiredNameMaxLength.value),
  },
}));
const v$ = useVuelidate(rules, { newHandles });

const formIsInvalid = computed(() => {
  return v$.value.newHandles.$invalid;
});

// METHODS

const reserveThisHandle = () => {
  if (v$.value.newHandles.$invalid) return null;
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
