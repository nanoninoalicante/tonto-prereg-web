<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import FloatingChooseYourHandle from "~/components/FloatingChooseYourHandle";
import PrimarySection from "~/components/PrimarySection";
import PageSection from "~/components/PageSection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FloatingPrimaryMenu from "~/components/FloatingPrimaryMenu";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import { useScroll, useElementBounding, useWindowSize } from "@vueuse/core";
import { useLayoutContent } from "~/composables/layoutContent";
import { useFloatingInput } from "~/composables/floatingInput";
const route = useRoute();
const { showFloatingForm } = useFloatingInput();
const { width } = useWindowSize();
const { walkthroughScreens, filteredWalkthroughScreens } = useLayoutContent();
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
    if (width && width > 768) {
        showFloatingForm.value = false;
    } else {
        showFloatingForm.value = true;
    }
});
// watch(windowY, (windowY) => {
//     console.log("height of last section: ", hOfLastSection.value);
//     toggleShowFloatingForm(windowY);
// });
let page = null;
onMounted(() => {
    page = document.getElementById("primaryPageHolder");
});
const scrollToTop = () => {
    console.log("scroll to top: ");
    page.scroll({ top: 0, left: 0, behavior: "smooth" });
};
watch(route, () => {
    console.log("route change");
    scrollToTop();
});

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
        <FloatingPrimaryMenu></FloatingPrimaryMenu>
        <FloatingChooseYourHandle
            v-if="showFloatingForm"
            class="fixed md:hidden"
        ></FloatingChooseYourHandle>

        <PageSection
            class="flex md:fixed md:right-0 md:top-0 lg:px-20 justify-center items-center"
        >
            <slot></slot>
        </PageSection>
        <PrimarySection
            v-for="(screen, index) in filteredWalkthroughScreens"
            :key="index"
        >
            <FullPageWalkThrough>{{ screen.text }}</FullPageWalkThrough>
            <template v-slot:bgimage>
                <img
                    class="absolute hidden md:block pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :src="'/' + screen.image"
                    alt=""
                />
                <img
                    class="absolute block md:hidden pointer-events-none z-0 top-0 left-0 h-full w-full object-cover"
                    :src="'/' + screen.mobileImage"
                    alt=""
                />
            </template>
        </PrimarySection>
        <PrimarySection ref="lastSection" class="block md:hidden">
            <FullPageWalkThrough class="text-gray-700 text-[3rem]"
                >PRE<br />REGISTER NOW</FullPageWalkThrough
            >
        </PrimarySection>
    </PrimaryPageHolder>
</template>
