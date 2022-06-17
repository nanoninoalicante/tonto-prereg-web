import { computed, reactive, ref, watch } from "vue";
import { useStorage } from "@vueuse/core";

const preregData: any = useStorage("prereg", {
  emailAddress: "",
  newHandles: "",
});
const submittingLoading = ref(false);
const modal = ref(null);
const fullPageLoader = ref(false);

const setModal = (val) => (modal.value = val);

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
    preregData,
    fullPageLoader,
  };
}
