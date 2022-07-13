<template>
    <PrimaryPageHolder>
        <PrimarySection class="hidden bg-[url('/socialNetwork.png')] md:block">
            <FullPageWalkThrough>AUDIO SOCIAL</FullPageWalkThrough>
            <PageArrowHolder />
        </PrimarySection>

        <PrimarySection class="block md:fixed md:right-0 md:top-0 lg:px-20">
            <slot></slot>
            <PageArrowHolder class="block md:hidden" />
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
        <PrimarySection class="block md:hidden">
            <ChooseHandleForm
                ><h1
                    class="text-left text-5xl font-medium tracking-tighter text-white"
                >
                    PRE REGISTER
                </h1>
                <h1
                    class="text-left text-6xl font-bold tracking-tighter text-white"
                >
                    NOW
                </h1></ChooseHandleForm
            >
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import ArrowDownIconV2 from "~/components/icons/ArrowDownIconV2";
import PageArrowHolder from "./PageArrowHolder";
</script>
