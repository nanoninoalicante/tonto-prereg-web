<template>
    <ChooseHandleForm
        ><h1 class="text-left text-2xl font-medium tracking-tighter text-white">
            Play to know
        </h1>
        <h1 class="text-left text-3xl font-bold tracking-tighter text-white">
            what is Tonto
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
console.log("data: ", data);
definePageMeta({
    layout: "pre-reg-v3",
});
</script>
