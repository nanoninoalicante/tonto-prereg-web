<script setup>
import { watch, onMounted } from "vue";
import FloatingChooseYourHandle from "~/components/FloatingChooseYourHandle";
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import ArrowDownIconV2 from "~/components/icons/ArrowDownIconV2";
import PageArrowHolder from "./PageArrowHolder";
import { useScroll } from "@vueuse/core";
import { useElementVisibility } from "@vueuse/core";
const el = ref(null);
const lastSection = ref(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
const targetIsVisible = useElementVisibility(lastSection);
</script>
<template>
    <PrimaryPageHolder ref="el">
        <div class="fixed z-50 text-xl text-red-600">{{ targetIsVisible }}</div>
        <FloatingChooseYourHandle></FloatingChooseYourHandle>
        <PrimarySection class="hidden bg-[url('/socialNetwork.png')] md:block">
            <FullPageWalkThrough>AUDIO SOCIAL</FullPageWalkThrough>
            <PageArrowHolder />
        </PrimarySection>

        <PrimarySection class="block md:fixed md:right-0 md:top-0 lg:px-20">
            <slot></slot>
            <PageArrowHolder class="hidden md:hidden" />
        </PrimarySection>
        <PrimarySection class="block bg-[url('/socialNetwork.png')] md:hidden">
            <FullPageWalkThrough>AUDIO SOCIAL</FullPageWalkThrough>

            <PageArrowHolder />
        </PrimarySection>
        <PrimarySection class="bg-[url('/onlyAudios.png')]">
            <FullPageWalkThrough>ONLY AUDIOS</FullPageWalkThrough>
            <PageArrowHolder />
        </PrimarySection>
        <PrimarySection class="bg-[url('/freeSpeech.png')]">
            <FullPageWalkThrough>FREE SPEECH</FullPageWalkThrough>
            <PageArrowHolder />
        </PrimarySection>
        <PrimarySection class="bg-[url('/noLimits.png')]">
            <FullPageWalkThrough>NO LIMITS</FullPageWalkThrough>
            <PageArrowHolder />
        </PrimarySection>
        <PrimarySection ref="lastSection" class="block md:hidden">
            <ChooseHandleForm
                ><h1
                    class="text-left text-5xl font-medium tracking-tighter text-grey-700"
                >
                    PRE REGISTER {{ y }}
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
