<template>
    <ChooseHandleForm
        ><h1
            class="text-left text-5xl font-medium tracking-tighter leading-12 text-grey-700 mb-12"
        >
            Are you ready for the next big thing in Social?
        </h1>
        <h1 class="text-left text-6xl font-bold tracking-tighter leading-10 text-grey-700 mb-12">
            Be the first to get access
        </h1></ChooseHandleForm
    >
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import { usePostStore } from "../../stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "pre-reg-v3",
});
</script>
