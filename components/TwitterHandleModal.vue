<template>
    <h3 class="mb-8 text-3xl font-semibold text-gray-900">
        <TwitterIcon
            height="32"
            width="32"
            class="mr-2 inline-block fill-blue-700"
        ></TwitterIcon
        >It looks like your handle is verified on twitter.
    </h3>
    <h3 class="my-4 text-xl font-semibold text-gray-700">
        But don't worry we can still reserve your handle - just send us a PM on
        twitter from your account and we'll get you verified on Tonto
    </h3>
    <p
        class="my-8 inline-block rounded-full bg-gray-100 p-4 text-2xl font-medium text-gray-500"
    >
        {{ preregData.newHandles || "@elonmusk" }}
    </p>
    <div class="flex flex-wrap justify-end">
        <div class="mb-2 w-full">
            <a
                class="font-heading mr-4 inline-block w-full cursor-pointer rounded-xl bg-teal-500 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 lg:mb-0"
                href="https://www.twitter.com/@gettonto"
                target="_blank"
                >Message us on Twitter to reserve {{ preregData.newHandles }}</a
            >
        </div>
        <div class="w-full">
            <a
                class="font-heading mr-4 mb-2 inline-block w-full cursor-pointer rounded-xl bg-gray-300 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-gray-500 hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 lg:mb-0"
                @click="handleCancel"
                >Go Back</a
            >
        </div>
    </div>
</template>
<script setup>
import TwitterIcon from "~/components/icons/TwitterIcon";
import TwitterVerifiedIcon from "~/components/icons/TwitterVerifiedIcon";
import { usePreReg } from "~/composables/prereg";
const emit = defineEmits(["cancel"]);
const { preregData } = usePreReg();
const handleCancel = () => {
    emit("cancel");
};
</script>
