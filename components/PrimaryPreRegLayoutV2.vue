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
