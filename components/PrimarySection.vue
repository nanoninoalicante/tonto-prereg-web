<script setup>
import ArrowDownIconV2 from "~/components/icons/ArrowDownIconV2";
import PrimaryLogoHolder from "~/components/PrimaryLogoHolder";
</script>
<template>
    <section
        class="relative flex min-h-screen w-full snap-start flex-col items-left justify-start p-8"
    >
        <div class="flex pt-8 px-6">
            <PrimaryLogoHolder />
        </div>
        <div class="flex py-4 px-6">
            <slot />
        </div>
        <div class="absolute left-1/2 -ml-6 bottom-0 my-8 flex">
            <ArrowDownIconV2
                class="h-12 w-12 animate-pulse fill-white opacity-50"
            ></ArrowDownIconV2>
        </div>
    </section>
</template>
