<script setup>
import ArrowDownIconV2 from "~/components/icons/ArrowDownIconV2";
import PrimaryLogoHolder from "~/components/PrimaryLogoHolder";
</script>
<template>
    <section
        class="items-left relative flex min-h-screen overflow-x-hidden w-full snap-start flex-col justify-start bg-cover px-4 py-4 md:w-1/2"
    >
        <div class="hidden md:block absolute left-1/2 top-0 my-8 -ml-6 flex">
            <ArrowDownIconV2
                class="h-12 w-12 animate-pulse fill-white opacity-75"
            ></ArrowDownIconV2>
        </div>
        <div class="flex flex-col w-full md:items-center md:justify-center min-h-full">
            <div class="block md:hidden flex px-6 pt-8">
                <PrimaryLogoHolder />
            </div>
            <div class="flex py-4 px-4">
                <slot />
            </div>
        </div>
        <div class="fixed left-1/2 md:left-1/4 bottom-0 my-8 -ml-6 flex">
            <ArrowDownIconV2
                class="h-12 w-12 animate-pulse fill-white opacity-75"
            ></ArrowDownIconV2>
        </div>
    </section>
</template>
