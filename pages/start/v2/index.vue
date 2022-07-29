<template>
    <div>
        <AudioPlayerHolder></AudioPlayerHolder>
        <div class="selection:bg-opacity-0 fixed z-10">
            <ChooseHandleForm
                ><h1
                    class="text-left text-2xl font-medium tracking-tighter text-grey-300"
                >
                    Coming soon! Pre-register for early access
                </h1>
                <h1
                    class="text-left text-3xl font-bold tracking-tighter text-grey-200"
                >
                    Now we're talkin
                </h1>
            </ChooseHandleForm>
        </div>
        <DrawMouse></DrawMouse>
    </div>
</template>
<script setup>
import DrawMouse from "~/components/DrawMouse";
import ChooseHandleForm from "~/components/ChooseHandleForm";
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
