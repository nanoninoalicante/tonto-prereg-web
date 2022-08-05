<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import FloatingChooseYourHandle from "~/components/FloatingChooseYourHandle";
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import ArrowDownIconV2 from "~/components/icons/ArrowDownIconV2";
import PageArrowHolder from "./PageArrowHolder";
import { useScroll, useElementBounding, useWindowSize } from "@vueuse/core";
import { useLayoutContent } from "~/composables/layoutContent";
import { useFloatingInput } from "~/composables/floatingInput";
const { showFloatingForm } = useFloatingInput();
const { width } = useWindowSize();
const { images, walkthroughScreens, filteredWalkthroughScreens } =
    useLayoutContent();
const el = ref(null);
const lastSection = ref(null);
const { y: windowY } = useScroll(el);
const { y: yPosOfLastSection, height: hOfLastSection } =
    useElementBounding(lastSection);
const offset = computed(() => hOfLastSection.value / 2);
const toggleShowFloatingForm = (windowY) => {
    if (
        windowY < offset.value ||
        windowY + offset.value > yPosOfLastSection.value
    ) {
        showFloatingForm.value = false;
        return;
    }
    showFloatingForm.value = true;
    return;
};
watch(width, (width) => {
    if (width && width > 600) {
        showFloatingForm.value = false;
    } else {
        showFloatingForm.value = true;
    }
});
// watch(windowY, (windowY) => {
//     console.log("height of last section: ", hOfLastSection.value);
//     toggleShowFloatingForm(windowY);
// });
onMounted(() => {
    console.log("window width: ", width.value);
    if (width.value && width.value > 600) {
        showFloatingForm.value = false;
    }
});
</script>
<template>
    <PrimaryPageHolder id="primaryPageHolder" ref="el">
        <div
            v-if="false"
            class="fixed flex flex-col bg-white bg-opacity-70 backdrop-blur-lg p-4 z-[9999] top-0 left-0 text-red-800"
        >
            <div>windowY: {{ windowY }}</div>
            <div>height of last section: {{ hOfLastSection }}</div>
            <div>y position of last section: {{ yPosOfLastSection }}</div>
            <div>offset: {{ offset }}</div>
            <div>windw width: {{ width }}</div>
        </div>
        <FloatingPrimaryLogoHolder></FloatingPrimaryLogoHolder>
        <FloatingChooseYourHandle
            v-if="showFloatingForm"
            class="fixed md:hidden"
        ></FloatingChooseYourHandle>
        <PrimarySection :class="`hidden md:block`">
            <FullPageWalkThrough>{{
                walkthroughScreens[0].text
            }}</FullPageWalkThrough>

            <template v-slot:bgimage>
                <img
                    class="absolute pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :class="walkthroughScreens[0].imagePosition"
                    :src="'/' + walkthroughScreens[0].image"
                    alt=""
                />
            </template>
        </PrimarySection>

        <PrimarySection
            class="flex md:fixed md:right-0 md:top-0 lg:px-20 justify-center items-center"
        >
            <slot></slot>
        </PrimarySection>
        <PrimarySection
            v-for="(screen, index) in filteredWalkthroughScreens"
            :key="index"
        >
            <FullPageWalkThrough>{{ screen.text }}</FullPageWalkThrough>
            <template v-slot:bgimage>
                <img
                    class="absolute hidden md:block pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :class="screen.imagePosition"
                    :src="'/' + screen.image"
                    alt=""
                />
                <img
                    class="absolute block md:hidden pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :class="screen.imagePosition"
                    :src="'/' + screen.mobileImage"
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
