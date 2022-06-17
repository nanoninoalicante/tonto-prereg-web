<template>
  <div>
    <div class="flex flex-col items-center space-y-2">
      <button
        v-if="handle"
        @click="goToPrevious"
        class="box-shadow-xl m-4 flex animate-pulse items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl hover:bg-teal-700"
      >
        <span
          class="text-xl font-bold font-medium leading-7 tracking-tighter text-white"
          >{{ handle }}</span
        >
        <CheckCircleIcon
          class="pointer-events-none inline h-8 w-8 text-teal-400"
        ></CheckCircleIcon>
      </button>
      <label
        class="mb-2 block w-full text-left text-lg font-medium tracking-tighter text-white"
        for="handle"
        >One more thing, we just need your email</label
      >
      <div
        class="relative flex w-full items-center text-gray-600 focus-within:text-gray-800"
      >
        <CheckCircleIcon
          v-if="v$.emailAddress.$dirty && !emailAddressIsInvalid"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-teal-800"
        ></CheckCircleIcon>
        <ExclamationCircleIcon
          v-if="emailAddressIsInvalid"
          class="pointer-events-none absolute right-0 mr-5 h-8 w-8 text-warning-500"
        ></ExclamationCircleIcon>
        <input
          class="w-full rounded-xl border-2 border-teal-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          :class="{ 'border-warning-500': emailAddressIsInvalid }"
          type="email"
          id="email"
          name="emailInput"
          ref="emailInputRef"
          v-model="v$.emailAddress.$model"
          placeholder="elon@musk.com"
        />
      </div>

      <div class="flex w-full flex-col space-y-1">
        <TransitionGroup
          v-if="emailAddressIsInvalid"
          name="list"
          tag="div"
          mode="out-in"
        >
          <ErrorMessage
            v-for="error in v$.emailAddress.$silentErrors"
            :key="error.$uid"
            :error="error"
          />
        </TransitionGroup>
        <Transition name="fade" mode="out-in">
          <SuccessInputMessage
            v-if="!emailAddressIsInvalid && v$.emailAddress.$dirty"
          />
        </Transition>
      </div>
    </div>
    <PrimaryButton
      :text="'Pre Register'"
      :disabled="formIsInvalid || !v$.emailAddress.$dirty"
      @click.once="submitPrereg"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { usePreReg } from "~/composables/prereg";
import ErrorMessage from "~/components/ErrorMessage";
import SuccessInputMessage from "~/components/SuccessInputMessage";
import PrimaryButton from "~/components/PrimaryButton";

const router = useRouter();
const prereg = usePreReg();
definePageMeta({
  layout: "prereg",
});
const emailAddress = ref("");
const rules = computed(() => ({
  emailAddress: {
    $lazy: true,
    email,
    required,
  },
}));
const v$ = useVuelidate(rules, { emailAddress });

const emailAddressIsInvalid = computed(() => {
  return v$.value.emailAddress.$invalid;
});
const formIsInvalid = computed(() => {
  return v$.value.emailAddress.$invalid;
});

// PREVIOUS STEP
const route = useRoute();
const handle = ref(route.params?.handle);

const goToPrevious = () => {
  console.log("/?handle=" + handle.value);
  return navigateTo({
    path: "/",
    query: { handle: handle.value, email: emailAddress.value },
  });
};

// SUBMIT FORM

const submitPrereg = () => {
  prereg.setModal({ message: "loading" });
  return null;
};

// WATCH EMAIL ADDRESS UPDATE

watch(emailAddress, (newVal) => {
  router.replace({ query: { email: newVal } });
});

const emailInputRef = ref(null);
onUpdated(() => {
  emailInputRef.value.focus();
});
onMounted(async () => {
  console.log("route: ", route.params?.handle);
  emailInputRef.value.focus();
  emailAddress.value = route.query?.email || "";
  if (route.query?.email && route.query?.email.length > 1) {
    await v$.value.emailAddress.$validate();
    prereg.fullPageLoader.value = false;
  } else {
    prereg.fullPageLoader.value = false;
  }
});
</script>
