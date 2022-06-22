<template>
    <div class="min-h-screen">
        <FullPageLoading></FullPageLoading>
        <Modal></Modal>
        <div class="flex h-screen flex-wrap md:mb-0">
            <div
                class="display-none w-full bg-lime-600 bg-[url('/background-photo.jpg')] bg-cover bg-center md:mb-0 md:h-screen md:w-1/2"
            ></div>
            <div class="h-screen w-full bg-primary-500 md:mb-0 md:w-1/2">
                <div
                    class="container mx-auto flex h-screen flex-col items-center justify-start space-y-8 px-8 pt-[5vh] md:px-12 lg:px-32"
                >
                    <div class="flex w-full justify-start">
                        <a href="https://www.gettonto.com"
                            ><img
                                src="/tonto_logotipo_horizontal_white@2x.png"
                                alt="Go Tonto"
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
import PrimaryFooter from "./PrimaryFooter";

const offline = useOnline();
const isMounted = useMounted();
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
