<script setup>
import { reactive, ref, watch, onMounted } from "vue";
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
const { images, walkthroughScreens, filteredWalkthroughScreens } =
    useLayoutContent();
const el = ref(null);
const lastSection = ref(null);
const { y } = useScroll(el);
const { y: sectionY, height } = useElementBounding(lastSection);
const showFloatingForm = ref(false);
const toggleShowFloatingForm = (scrollY) => {
    if (
        scrollY + height.value / 2 > sectionY.value ||
        scrollY + height.value / 2 < height.value
    ) {
        showFloatingForm.value = false;
    } else {
        showFloatingForm.value = true;
    }
};
watch(y, (scrollY) => {
    toggleShowFloatingForm(scrollY);
});
let rellax = null;
onMounted(() => {
    toggleShowFloatingForm(y.value);
    rellax = new Rellax(".rellax");
});
</script>
<template>
    <PrimaryPageHolder ref="el">
        <FloatingChooseYourHandle
            v-if="showFloatingForm"
            class="hidden"
        ></FloatingChooseYourHandle>
        <PrimarySection :class="`hidden md:block`">
            <FullPageWalkThrough>{{
                walkthroughScreens[0].text
            }}</FullPageWalkThrough>
            <PageArrowHolder />

            <template v-slot:bgimage>
                <img
                    class="absolute pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :class="walkthroughScreens[0].imagePosition"
                    :src="'/' + walkthroughScreens[0].image"
                    alt=""
                />
            </template>
        </PrimarySection>

        <PrimarySection class="block md:fixed md:right-0 md:top-0 lg:px-20">
            <slot></slot>
            <PageArrowHolder class="hidden md:hidden" />
        </PrimarySection>
        <PrimarySection
            v-for="(screen, index) in filteredWalkthroughScreens"
            :key="index"
        >
            <FullPageWalkThrough class="rellax">{{
                screen.text
            }}</FullPageWalkThrough>
            <PageArrowHolder />
            <template v-slot:bgimage>
                <img
                    class="absolute pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :class="screen.imagePosition"
                    :src="'/' + screen.image"
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
