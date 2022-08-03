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
const el = ref(null);
const lastSection = ref(null);
const { y } = useScroll(el);
const { y: sectionY, height } = useElementBounding(lastSection);
const hideFloatingForm = ref(true);
watch(y, (newval) => {
    if (newval + height.value / 2 > sectionY.value) {
        hideFloatingForm.value = false;
    } else {
        hideFloatingForm.value = true;
    }
});

const images = ref([
    "cheerful-young-lady-wearing-headphones-using-mobi-2021-12-09-08-12-41-utc.jpg",
    "exercises-stretching-body-muscles-in-city-healthy-2021-09-02-07-22-45-utc.jpg",
    "happy-afro-man-using-mobile-smartphone-outdoor-2021-09-09-16-19-15-utc.jpg",
    "happy-man-at-home-smiling-and-listening-to-music-f-2022-07-26-05-17-25-utc.jpg",
    "happy-spanish-girl-in-airpods-is-singing-with-mobi-2022-06-06-23-53-18-utc.jpg",
    "modern-outdoor-workout-healthy-lifestyle-and-star-2021-09-02-17-13-06-utc.jpg",
    "outdoor-shot-of-caucasian-female-enjoys-listening-2021-08-30-23-54-36-utc.jpg",
    "pretty-caucasian-woman-in-wireless-headphones-usin-2021-12-09-08-17-52-utc.jpg",
    "smiling-girl-using-music-app-on-phone-2021-09-24-03-50-37-utc.jpg",
    "smiling-young-business-woman-using-her-free-hands-2021-08-27-09-31-39-utc.jpg",
    "young-woman-listening-music-smart-phone-drinking-c-2022-02-03-16-33-07-utc.jpg",
]);
const walkthroughScreens = reactive([
    {
        text: "AUDIO SOCIAL",
    },
    {
        text: "AUDIO SOCIAL",
    },
    {
        text: "AUDIO SOCIAL",
    },
    {
        text: "AUDIO SOCIAL",
    },
]);
</script>
<template>
    <PrimaryPageHolder ref="el">
        <FloatingChooseYourHandle
            v-if="hideFloatingForm"
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
            <FullPageWalkThrough>{{ screen.text }}</FullPageWalkThrough>
            <PageArrowHolder />
            <template v-slot:bgimage>
                <img
                    class="absolute pointer-events-none z-0 top-0 left-0 h-full w-full object-left object-cover"
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
