<template>
    <PrimaryPageHolder class="flex-wrap">
        <PrimarySection class="hidden bg-[url('/noLimits.png')] md:block">
            <FullPageWalkThrough>NO LIMITS</FullPageWalkThrough>
        </PrimarySection>
        <PrimarySection>
            <StepTwo />
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import StepTwo from "~/components/StepTwo";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";

import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";

definePageMeta({
    layout: "pre-reg-v2",
});
</script>
