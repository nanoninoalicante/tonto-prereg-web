import { ref } from "vue";
const emailAddress = ref("");
const handle = ref("");
const submittingLoading = ref(false);
const modal = ref(null);

const setHandle = (val) => (handle.value = val);
const setModal = (val) => (modal.value = val);

export function usePreReg() {
  return {
    handle,
    emailAddress,
    submittingLoading,
    modal,
    setHandle,
    setModal,
  };
}
