<template>
    <PrimaryPageHolder>
        <PrimarySection>
            <StepTwo />
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import StepTwo from "~/components/StepTwo";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";

definePageMeta({
    layout: "pre-reg-v2",
});
</script>
