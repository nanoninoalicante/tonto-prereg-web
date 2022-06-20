<template>
    <div>
        <div class="flex flex-col items-center space-y-2">
            <div v-if="isMounted" class="handle">
                <button
                    v-show="preregData.newHandles"
                    @click="goToPrevious"
                    class="box-shadow-xl m-4 flex animate-pulse items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl hover:bg-teal-700"
                >
                    <span
                        class="text-xl font-bold font-medium leading-7 tracking-tighter text-white"
                        >{{ preregData.newHandles }}</span
                    >
                    <CheckCircleIcon
                        class="pointer-events-none inline h-8 w-8 text-teal-400"
                    ></CheckCircleIcon>
                </button>
            </div>
            <label
                class="mb-2 block w-full text-left text-lg font-medium tracking-tighter text-white"
                for="handle"
                >One more thing, we just need your email</label
            >
            <div
                class="relative flex w-full items-center text-gray-600 focus-within:text-gray-800"
            >
                <CircleLoader
                    v-if="formInputLoading"
                    width="20"
                    height="20"
                    fill="#ccc"
                    class="absolute left-0 ml-4"
                ></CircleLoader>
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

            <div v-auto-animate class="flex w-full flex-col space-y-1">
                <ErrorMessage
                    v-for="error in v$.emailAddress.$silentErrors"
                    :key="error.$uid"
                    :error="error"
                />
                <SuccessInputMessage
                    v-if="!emailAddressIsInvalid && v$.emailAddress.$dirty"
                />
            </div>
        </div>
        <div v-auto-animate class="buttons mt-4 space-x-2">
            <PrimaryButton :text="'Go Back'" @click.once="goToPrevious" />
            <PrimaryButton
                :text="'Pre Register'"
                :disabled="formIsInvalid || !v$.emailAddress.$dirty"
                @click.once="submitPrereg"
            />
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { usePreReg } from "~/composables/prereg";
import autoAnimate from "@formkit/auto-animate";
const isMounted = useMounted();
const formInputLoading = ref(true);
const router = useRouter();
const { setModal, fullPageLoader, preregData } = usePreReg();
definePageMeta({
    layout: "prereg",
});
const rules = computed(() => ({
    emailAddress: {
        $lazy: true,
        email,
        required,
    },
}));
const v$ = useVuelidate(rules, preregData);

const emailAddressIsInvalid = computed(() => {
    return v$.value.emailAddress.$invalid;
});
const formIsInvalid = computed(() => {
    return v$.value.emailAddress.$invalid;
});

// PREVIOUS STEP
const goToPrevious = () => {
    return navigateTo({
        path: "/",
    });
};

// SUBMIT FORM

const submitPrereg = () => {
    fullPageLoader.value = true;
    setTimeout(() => {
        fullPageLoader.value = false;
        setModal({ message: "loading" });
    }, 1000);
    return null;
};

const emailInputRef = ref(null);
onUpdated(() => {
    emailInputRef.value.focus();
});

/*
ANIMATE
 */
const vAutoAnimate = {
    mounted: (el) => autoAnimate(el),
};

onMounted(() => {
    if (
        !preregData.value?.newHandles ||
        preregData.value?.newHandles.length === 0
    ) {
        window.location.href = "/";
    }
});
onMounted(async () => {
    emailInputRef.value.focus();
    if (
        preregData.value.emailAddress &&
        preregData.value.emailAddress.length > 1
    ) {
        await v$.value.emailAddress.$validate();
        formInputLoading.value = false;
    }
    formInputLoading.value = false;
});
</script>
