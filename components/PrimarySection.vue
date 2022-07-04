<script setup>
import ArrowDownIcon from "~/components/icons/ArrowDownIcon";
</script>
<template>
    <section
        class="flex min-h-screen w-full snap-start flex-col items-center justify-between"
    >
        <div class="py-12 px-6 md:w-1/2">
            <slot />
        </div>
        <div class="my-8 flex">
            <ArrowDownIcon
                class="h-12 w-12 animate-pulse fill-white opacity-50"
            ></ArrowDownIcon>
        </div>
    </section>
</template>
