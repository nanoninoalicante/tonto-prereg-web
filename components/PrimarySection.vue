<script setup>
import PrimaryLogoHolder from "~/components/PrimaryLogoHolder";
</script>
<template>
    <section
        class="relative items-left flex min-h-screen overflow-x-hidden w-full snap-start flex-col justify-start bg-cover px-4 py-4 md:w-1/2"
    >
        <slot name="bgimage"></slot>
        <div class="relative h-full flex flex-col pt-36 md:pt-0 md:pb-20 md:justify-end w-full">
            <div class="flex py-4 px-4">
                <slot />
            </div>
        </div>
    </section>
</template>
