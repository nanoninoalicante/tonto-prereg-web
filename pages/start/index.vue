<template>
    <div class="flex flex-wrap">
        <h1 class="text-left text-5xl font-medium tracking-tighter text-grey-800">
            Coming soon! Pre-register for early access
        </h1>
        <h1 class="text-left text-5xl font-bold tracking-tighter text-grey-600">
            Now we're talkin
        </h1>
    </div>
</template>
<script setup>
import { usePostStore } from "../../stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "pre-reg-v3",
});
</script>
