<template>
    <div>
        <AudioPlayerHolder></AudioPlayerHolder>
        <DrawMouse></DrawMouse>
    </div>
</template>
<script setup>
import DrawMouse from "~/components/DrawMouse";
import AudioPlayerHolder from "~/components/Player/AudioPlayerHolder";
import GlobalPlayer from "~/components/Player/GlobalPlayer";
import { usePostStore } from "~/stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "default",
});
</script>
