<template>
    <div>
        <AudioPlayerHolder></AudioPlayerHolder>
        <div v-auto-animate class="selection:bg-opacity-0 fixed z-10">
            <FullPageWalkThrough>{{ title }}</FullPageWalkThrough>
            <ChooseHandleForm
                ><h1 v-auto-animate
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
import { computed } from "vue";
import DrawMouse from "~/components/DrawMouse";
import ChooseHandleForm from "~/components/ChooseHandleForm";
import AudioPlayerHolder from "~/components/Player/AudioPlayerHolder";
import { usePostStore } from "~/stores/posts";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import { vAutoAnimate } from "~/directives/directives";
import { useGeneral } from "~/composables/general";
import { useMousePressed } from "@vueuse/core";
const { getRandomInt } = useGeneral();

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
definePageMeta({
    layout: "default",
});



const titles = ["AUDIO SOCIAL", "AUDIO ONLY"];
const titleSelectionIndex = ref(1);
// const { pressed } = useMousePressed();
// watch(pressed, (value) => {
//     titleSelectionIndex.value = getRandomInt(0, 2);
// });
const title = computed(() => {
    return titles[getRandomInt(0, 2)] || "TONTO";
});
</script>
