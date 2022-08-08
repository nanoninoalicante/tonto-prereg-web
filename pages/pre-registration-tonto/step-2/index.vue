<template>
    <StepTwo />
</template>
<script setup>
import StepTwo from "~/components/StepTwo";
definePageMeta({
    layout: "pre-reg-v3",
    middleware: ["redirect"],
});
</script>
