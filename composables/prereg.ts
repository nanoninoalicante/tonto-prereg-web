import { ref } from "vue";

const checkHandleLoading = ref(false);
const handleVerified = ref(false);
const checkHandle = async (handle) => {
  console.log("check handle: ", handle);
  checkHandleLoading.value = true;
  const r = await $fetch("/api/session");
  console.log("checked: ", r);
  checkHandleLoading.value = false;
  return handle;
};
export function usePreReg() {
  return { checkHandle, checkHandleLoading, handleVerified };
}
