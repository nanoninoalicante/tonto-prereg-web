<template>
    <div>
        <div class="flex flex-col items-center space-y-2">
            <PrimaryButton :text="'Start Again'" @click.once="resetForm">
            </PrimaryButton>
            <button
                v-if="preregData.newHandles"
                class="box-shadow-xl m-4 flex items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl hover:bg-teal-700"
            >
                <span
                    class="text-xl font-bold font-medium leading-7 tracking-tighter text-white"
                    >{{ preregData.newHandles }}</span
                >
                <CheckCircleIcon
                    class="pointer-events-none inline h-8 w-8 text-teal-400"
                ></CheckCircleIcon>
            </button>
            <button
                v-if="preregData.emailAddress"
                class="box-shadow-xl m-4 flex items-center space-x-2 rounded-full bg-primary-700 p-4 text-gray-500 shadow-2xl hover:bg-teal-700"
            >
                <span
                    class="text-xl font-bold font-medium leading-7 tracking-tighter text-white"
                    >{{ preregData.emailAddress }}</span
                >
                <CheckCircleIcon
                    class="pointer-events-none inline h-8 w-8 text-teal-400"
                ></CheckCircleIcon>
            </button>
        </div>
    </div>
</template>
<script setup>
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { onMounted, ref } from "vue";
import { usePreReg } from "~/composables/prereg";
const { preregData, resetForm } = usePreReg();
onMounted(() => {
    if (
        !preregData.value?.newHandles ||
        preregData.value?.newHandles.length === 0 ||
        !preregData.value?.emailAddress ||
        preregData.value?.emailAddress.length === 0
    ) {
        window.location.href = "/";
    }
});
</script>
