<template>
    <DrawMouse></DrawMouse>
</template>
<script setup>
import DrawMouse from "~/components/DrawMouse";
import { usePostStore } from "~/stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "pre-reg-v4",
});
</script>
