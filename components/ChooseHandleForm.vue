<template>
    <div class="w-full">
        <div class="w-full">
            <slot></slot>
        </div>
        <div class="block w-full">
            <slot name="player"></slot>
        </div>
        <div v-auto-animate v-if="!showFloatingForm" class="">
            <label
                class="mb-2 block w-full text-left text-lg font-medium tracking-tighter text-gray-500"
                for="handle"
                >{{ "Choose your new Tonto Handle" }}</label
            >
            <div
                class="relative mb-2 flex justify-center items-stretch space-x-2 text-gray-600 focus-within:text-gray-800"
            >
                <div class="relative w-full">
                    <input
                        class="w-full rounded-2xl md:rounded-full border-4 border-teal-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                        :class="{
                            'border-warning-500 focus:ring-warning-500':
                                formIsInvalid,
                        }"
                        type="text"
                        id="handle"
                        name="newHandleInput"
                        ref="handleInputRef"
                        autocorrect="off"
                        v-model="v$.newHandles.$model"
                        placeholder="@elonmusk"
                        v-on:keydown.enter="reserveThisHandle"
                    />
                    <CircleLoader
                        v-if="formInputLoading"
                        width="20"
                        height="20"
                        fill="#ccc"
                        class="absolute left-0 top-1/2 -mt-2 ml-5"
                    ></CircleLoader>
                    <CheckCircleIcon
                        v-if="!formIsInvalid && v$.newHandles.$dirty"
                        class="pointer-events-none absolute right-0 top-1/2 -mt-4 mr-5 h-8 w-8 text-teal-800"
                    ></CheckCircleIcon>
                    <ExclamationCircleIcon
                        v-if="v$.newHandles.$invalid"
                        class="pointer-events-none absolute right-0 top-1/2 -mt-4 mr-5 h-8 w-8 text-warning-500"
                    ></ExclamationCircleIcon>
                </div>

                <div v-auto-animate class="buttons flex items-stretch">
                    <PrimaryButton
                        :disabled="formIsInvalid || !v$.newHandles.$dirty"
                        @click.once="reserveThisHandle"
                    >
                        Next
                    </PrimaryButton>
                </div>
            </div>
            <div v-auto-animate class="flex w-full flex-col space-y-1">
                <ErrorMessage
                    v-for="error in v$.newHandles.$silentErrors"
                    :key="error.$uid"
                    :error="error"
                />
                <SuccessInputMessage
                    v-if="!v$.newHandles.$invalid && v$.newHandles.$dirty"
                    :message="'That\'s a good lookin handle!'"
                ></SuccessInputMessage>
            </div>
        </div>
    </div>
</template>
<script setup>
/*
IMPORTS
 */
import { computed, onMounted, ref, watch } from "vue";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { usePreReg } from "~/composables/prereg";
import { vAutoAnimate } from "~/directives/directives";
import { useMetaTags } from "~/composables/metatags";
import { useContent } from "~/composables/content";
import { useFloatingInput } from "~/composables/floatingInput";
const { showFloatingForm } = useFloatingInput();
const { getContent } = useContent();
const { description } = useMetaTags();

const chooseYourHandleLabel = getContent("label", "chooseYourNewHandleLabel");

const { preregData } = usePreReg();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const indices = [
    runtimeConfig.public?.algoliaPreRegIndex,
    runtimeConfig.public?.algoliaUsersIndex,
];
const algolia = useAlgoliaRef();
const handleInputRef = ref(null);
const formInputLoading = ref(true);

// VALIDATION

const searchResultMatchesInput = (inputName, searchMatches) => {
    if (!searchMatches || searchMatches.length === 0) return false;
    return searchMatches.some((hit) => hit.userName === inputName);
};

const checkIfHandleExists = (value) => {
    formInputLoading.value = true;
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

        formInputLoading.value = false;
        return !searchResultMatchesInput(value.slice(1), concatenatedResults);
    });
};

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
const v$ = useVuelidate(rules, preregData);

const formIsInvalid = computed(() => {
    return v$.value.newHandles.$invalid;
});

/*
WATCH
 */

watch(
    () => preregData.value.newHandles,
    (newVal) => {
        console.log("formatting handle: ", preregData.value.newHandles);
        if (!preregData.value.newHandles.startsWith("@")) {
            preregData.value.newHandles = "@" + newVal;
        }
        preregData.value.newHandles = preregData.value.newHandles.replaceAll(
            /\s|[^@a-zA-Z0-9_-]/gi,
            ""
        );
        preregData.value.newHandles = preregData.value.newHandles.trim();
    }
);

// METHODS

const reserveThisHandle = () => {
    if (v$.value.newHandles.$invalid) return null;
    return navigateTo({
        path: "/pre-registration-tonto/step-2/",
    });
};

/*
ON MOUNTED
 */

onMounted(async () => {
    console.log("prereg data: ", preregData.value.newHandles);
    // handleInputRef.value.focus();
    if (preregData.value.newHandles && preregData.value.newHandles.length > 1) {
        await v$.value.newHandles.$validate();
    } else {
        formInputLoading.value = false;
    }
});
</script>
