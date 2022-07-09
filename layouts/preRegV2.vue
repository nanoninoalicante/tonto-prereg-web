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

<template>
    <div class="min-h-screen">
        <FullPageLoading></FullPageLoading>
        <Modal></Modal>
        <slot />

        <PrimaryFooter />
        <Alerts></Alerts>
        <Cookies></Cookies>
    </div>
</template>
