<template>
    <PrimaryPageHolder>
        <PrimarySection class="bg-[url('/freeSpeech.png')]">
            <FullPageWalkThrough>FREE SPEECH</FullPageWalkThrough>
        </PrimarySection>
        <PrimarySection>
            <StepThree />
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import StepThree from "~/components/StepThree";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";

import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";

definePageMeta({
    layout: "pre-reg-v2",
});
</script>
