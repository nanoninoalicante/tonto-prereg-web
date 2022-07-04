<template>
    <PrimaryPageHolder>
        <PrimarySection>
            <div class="mb-2 -ml-4 flex w-full justify-start">
                <a
                    href="https://www.gettonto.com"
                    title="Get Tonto - Pre Register now to secure your favorite handle"
                    ><img
                        src="/tonto_logotipo_horizontal_white@2x.png"
                        alt="Get Tonto - Create, share and stream your favourite audio content"
                        title="Get Tonto - Create, share and stream your favourite audio content"
                        class="m-0 w-48 p-0"
                /></a>
            </div>
            <ChooseHandleForm />
        </PrimarySection>
        <PrimarySection>
            <ChooseHandleForm />
        </PrimarySection>
    </PrimaryPageHolder>
</template>
<script setup>
import ChooseHandleForm from "~/components/ChooseHandleForm";
import PrimarySection from "../../components/PrimarySection";
import PrimaryPageHolder from "../../components/PrimaryPageHolder";

definePageMeta({
    layout: "preregv2",
});
</script>
