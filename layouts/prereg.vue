<template>
    <div class="min-h-screen">
        <FullPageLoading></FullPageLoading>
        <Modal></Modal>
        <div class="flex min-h-screen flex-wrap md:mb-0">
            <div
                class="hidden w-full bg-lime-600 bg-[url('/tonto-prereg-compressed.jpg')] bg-cover bg-center md:mb-0 md:block md:min-h-screen md:w-1/2"
            ></div>
            <div class="w-full bg-primary-500 md:mb-0 md:w-1/2">
                <div
                    class="container mx-auto mb-24 flex flex-col items-center justify-start px-8 pt-8 md:px-12 lg:px-32"
                >
                    <div class="mb-2 -ml-8 flex w-full justify-start">
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
                    <div class="w-full">
                        <slot />
                    </div>
                </div>

                <PrimaryFooter />
            </div>
        </div>
        <Alerts></Alerts>
        <Cookies></Cookies>
    </div>
</template>
<script setup>
import Modal from "~/components/Modal";
import Cookies from "~/components/Cookies.vue";
import Alerts from "~/components/Alerts.vue";
import FullPageLoading from "~/components/FullPageLoading";
import { watch } from "vue";
import { useAlerts } from "~/composables/alerts";
import PrimaryFooter from "../components/PrimaryFooter";
import { useOnline } from "@vueuse/core/index";

const offline = useOnline();
const { addAlert } = useAlerts();
watch(offline, (newVal) => {
    console.log("offline: ", newVal);
    if (!newVal) {
        addAlert({
            id: "2",
            message: "Looks like you've lost internet",
            type: "warning",
            close: "manual",
        });
    } else {
        addAlert({
            id: "3",
            message: "Back online",
            type: "success",
            close: "auto",
        });
    }
});
</script>
