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
          <ErrorMessage
            v-for="error in v$.newHandles.$silentErrors"
            :key="error.$uid"
            :error="error"
          />
        </TransitionGroup>
        <Transition name="fade" mode="in-out">
          <SuccessInputMessage
            v-if="!v$.newHandles.$invalid && v$.newHandles.$dirty"
            :message="'That\'s a good lookin handle!'"
          ></SuccessInputMessage>
        </Transition>
      </div>
    </div>
    <PrimaryButton
      :text="'Reserve this Handle'"
      :disabled="formIsInvalid"
      @click.once="reserveThisHandle"
    >
    </PrimaryButton>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { usePreReg } from "~/composables/prereg";
import ErrorMessage from "~/components/ErrorMessage";
import SuccessInputMessage from "~/components/SuccessInputMessage";
import PrimaryButton from "~/components/PrimaryButton";
const prereg = usePreReg();
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

const newHandles = prereg.handle;
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
  return navigateTo({
    path: "/step-2/" + newHandles.value,
    query: { ...route.query },
  });
};

// HANDLE UPDATES

watch(newHandles, (newHandleName) => {
  if (!newHandleName.startsWith("@")) {
    newHandles.value = "@" + newHandleName;
  }
  if (/\s/gi.test(newHandleName)) {
    newHandles.value = newHandleName.replaceAll(/\s/gi, "");
  }
  router.replace({ query: { handle: newHandleName, ...route.query } });
});

onMounted(async () => {
  console.log("route: ", route.query?.handle);
  handleInputRef.value.focus();
  newHandles.value = route.query?.handle || "";
  if (route.query?.handle && route.query?.handle.length > 1) {
    await v$.value.newHandles.$validate();
    prereg.fullPageLoader.value = false;
  } else {
    prereg.fullPageLoader.value = false;
  }
});
</script>
