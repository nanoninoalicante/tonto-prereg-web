import { computed, reactive, ref, watch } from "vue";
import { useStorage } from "@vueuse/core";

/*
STATE
 */
const preregData: any = useStorage("prereg", {
    emailAddress: "",
    newHandles: "",
    termsAccepted: false,
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
    preregData.value.termsAccepted = false;
    window.location.reload();
};

export function usePreReg() {
    return {
        submittingLoading,
        modal,
        setModal,
        resetForm,
        preregData,
        fullPageLoader,
    };
}
