import { computed, reactive, ref, watch } from "vue";
import { useStorage } from "@vueuse/core";

/*
STATE
 */
const preregData: any = useStorage("prereg", {
    emailAddress: "",
    newHandles: "",
});
const submittingLoading = ref(false);
const modal = ref(null);
const fullPageLoader = ref(false);

/*
METHODS
 */
const setModal = (val) => (modal.value = val);
const resetForm = async () => {
    preregData.value.newHandles = "";
    preregData.value.emailAddress = "";
    window.location.reload();
};

/*
COMPUTED
 */
const handle = computed({
    get() {
        console.log("get new handle: ", preregData.value.newHandles);
        return preregData.value.newHandles;
    },
    set(newHandleName: string) {
        console.log("updating handle: ", newHandleName);
        if (!newHandleName.startsWith("@")) {
            preregData.value.newHandles = "@" + newHandleName;
            return;
        }
        if (/\s/gi.test(newHandleName)) {
            preregData.value.newHandles = newHandleName.replaceAll(/\s/gi, "");
            return;
        }
        preregData.value.newHandles = newHandleName;
    },
});

export function usePreReg() {
    return {
        submittingLoading,
        modal,
        handle,
        setModal,
        resetForm,
        preregData,
        fullPageLoader,
    };
}
