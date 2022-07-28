<template>
    <ChooseHandleForm
        ><h1 class="text-left text-2xl font-medium tracking-tighter text-grey-300">
            Coming soon! Pre-register for early access
        </h1>
        <h1 class="text-left text-3xl font-bold tracking-tighter text-grey-200">
            Now we're talkin
        </h1>

        <template v-slot:player> <GlobalPlayer></GlobalPlayer> </template
    ></ChooseHandleForm>
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import GlobalPlayer from "~/components/Player/GlobalPlayer";
import { usePostStore } from "../../stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "pre-reg-v3",
});
</script>
