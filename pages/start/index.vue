<template>
    <PrimaryPageHolder>
        <PrimarySection class="hidden md:block">
            <FullPageWalkThrough>player</FullPageWalkThrough>
        </PrimarySection>

        <section
            class="items-left top-0 right-0 flex hidden min-h-screen w-1/2 flex-col justify-start md:fixed md:block"
        >
            <div class="flex flex-col px-4 lg:px-24">
                <div class="flex px-6 pt-8">
                    <PrimaryLogoHolder />
                </div>
                <div class="flex py-4 px-6">
                    <ChooseHandleForm />
                </div>
            </div>
        </section>
        <PrimarySection class="block md:hidden">
            <ChooseHandleForm />
        </PrimarySection>
        <PrimarySection class="bg-[url('/socialNetwork.png')]">
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
            <ChooseHandleForm />
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "~/components/PrimarySection";
import PrimaryPageHolder from "~/components/PrimaryPageHolder";
import FullPageWalkThrough from "~/components/FullPageWalkThrough";
import { usePostStore } from "../../stores/posts";

const postId = "62c8cc735ce5bc000f58c7ea";
const postStore = usePostStore();
const { data } = useAsyncData("post", () => postStore.fetchPost(postId));
console.log("data: ", data);
definePageMeta({
    layout: "pre-reg-v2",
});
</script>
