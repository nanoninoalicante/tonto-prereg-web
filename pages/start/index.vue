<template>
    <PrimaryPageHolder>
        <!--        <PrimarySection class="hidden md:block">-->
        <!--            <GlobalPlayer></GlobalPlayer>-->
        <!--        </PrimarySection>-->

        <PrimarySection class="hidden bg-[url('/socialNetwork.png')] md:block">
            <FullPageWalkThrough>NEW SOCIAL NET</FullPageWalkThrough>
        </PrimarySection>

        <section
            class="items-left top-0 right-0 flex hidden min-h-screen w-1/2 flex-col justify-start md:fixed md:block"
        >
            <div class="flex flex-col px-4 lg:px-24">
                <div class="flex px-6 pt-8">
                    <PrimaryLogoHolder />
                </div>
                <div class="flex py-4 px-6">
                    <ChooseHandleForm>
                        <h1
                            class="text-left text-2xl font-medium tracking-tighter text-white"
                        >
                            Play to know
                        </h1>
                        <h1
                            class="text-left text-3xl font-bold tracking-tighter text-white"
                        >
                            what is Tonto
                        </h1>
                    </ChooseHandleForm>
                </div>
            </div>
        </section>
        <PrimarySection class="block md:hidden">
            <ChooseHandleForm
                ><h1
                    class="text-left text-2xl font-medium tracking-tighter text-white"
                >
                    Play to know
                </h1>
                <h1
                    class="text-left text-3xl font-bold tracking-tighter text-white"
                >
                    what is Tonto
                </h1>

                <template v-slot:player>
                    <GlobalPlayer></GlobalPlayer> </template
            ></ChooseHandleForm>
        </PrimarySection>
        <PrimarySection class="block bg-[url('/socialNetwork.png')] md:hidden">
            <FullPageWalkThrough>NEW SOCIAL NET</FullPageWalkThrough>
        </PrimarySection>
        <PrimarySection class="bg-[url('/onlyAudios.png')]">
            <FullPageWalkThrough>ONLY AUDIOS</FullPageWalkThrough>
        </PrimarySection>
        <PrimarySection class="bg-[url('/freeSpeech.png')]">
            <FullPageWalkThrough>FREE SPEECH</FullPageWalkThrough>
        </PrimarySection>
        <PrimarySection class="bg-[url('/noLimits.png')]">
            <FullPageWalkThrough>NO LIMITS</FullPageWalkThrough>
        </PrimarySection>
        <PrimarySection class="block md:hidden">
            <ChooseHandleForm
                ><h1
                    class="text-left text-5xl font-medium tracking-tighter text-white"
                >
                    PRE REGISTER
                </h1>
                <h1
                    class="text-left text-6xl font-bold tracking-tighter text-white"
                >
                    NOW
                </h1></ChooseHandleForm
            >
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import GlobalPlayer from "~/components/Player/GlobalPlayer";
import { usePostStore } from "../../stores/posts";
import { useMetaTags } from "../../composables/metatags";

import { useMediaQuery } from "@vueuse/core";

const isMobileScreen = useMediaQuery("(min-width: 0px)");
const isMedScreen = useMediaQuery("(min-width: 481px)");

const { description } = useMetaTags();

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
console.log("data: ", data);
definePageMeta({
    layout: "pre-reg-v2",
});
</script>
