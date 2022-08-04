<script setup>
import { reactive, ref, watch, computed } from "vue";
import FloatingChooseYourHandle from "~/components/FloatingChooseYourHandle";
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import ArrowDownIconV2 from "~/components/icons/ArrowDownIconV2";
import PageArrowHolder from "./PageArrowHolder";
import { useScroll, useElementBounding } from "@vueuse/core";
import { useLayoutContent } from "~~/composables/layoutContent";
import Rellax from "rellax";
const { images, walkthroughScreens } = useLayoutContent();
const el = ref(null);
const lastSection = ref(null);
const { y } = useScroll(el);
const { y: sectionY, height } = useElementBounding(lastSection);
const showFloatingForm = ref(true);
watch(y, (scrollY) => {
    if (scrollY + height.value / 2 > sectionY.value || scrollY < height.value) {
        showFloatingForm.value = false;
    } else {
        showFloatingForm.value = true;
    }
});
</script>
<template>
    <PrimaryPageHolder ref="el">
        <FloatingChooseYourHandle
            v-if="showFloatingForm"
        ></FloatingChooseYourHandle>
        <PrimarySection :class="`hidden bg-[url('/${images[0]}')] md:block`">
            <FullPageWalkThrough>{{
                walkthroughScreens[0].text
            }}</FullPageWalkThrough>
            <PageArrowHolder />
        </PrimarySection>

        <PrimarySection class="block md:fixed md:right-0 md:top-0 lg:px-20">
            <slot></slot>
            <PageArrowHolder class="hidden md:hidden" />
        </PrimarySection>
        <PrimarySection
            v-for="(screen, index) in walkthroughScreens"
            :key="index"
        >
            <FullPageWalkThrough class="rellax">{{ screen.text }}</FullPageWalkThrough>
            <PageArrowHolder />
            <template v-slot:bgimage>
                <img
                    class="absolute pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :class="screen.imagePosition"
                    :src="'/' + images[index]"
                    alt=""
                />
            </template>
        </PrimarySection>
        <PrimarySection ref="lastSection" class="block md:hidden">
            <ChooseHandleForm
                ><h1
                    class="text-left text-5xl font-medium tracking-tighter text-grey-700"
                >
                    PRE REGISTER
                </h1>
                <h1
                    class="text-left text-6xl font-bold tracking-tighter text-grey-700"
                >
                    NOW
                </h1></ChooseHandleForm
            >
        </PrimarySection>
    </PrimaryPageHolder>
</template>
