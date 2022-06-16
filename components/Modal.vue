<template>
  <section
    v-if="showModal"
    class="fixed top-0 left-0 right-0 bottom-0 z-10 flex h-full w-full items-center overflow-y-auto bg-gray-800 bg-opacity-80 p-4"
  >
    <div class="m-auto w-full max-w-lg rounded-md bg-white p-8">
      <div
        class="bg-green-100 mb-4 flex h-10 w-10 items-center justify-center rounded-md"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4733 4.80667C12.4114 4.74418 12.3376 4.69458 12.2564 4.66074C12.1751 4.62689 12.088 4.60947 12 4.60947C11.912 4.60947 11.8249 4.62689 11.7436 4.66074C11.6624 4.69458 11.5886 4.74418 11.5267 4.80667L6.56 9.78L4.47333 7.68667C4.40899 7.62451 4.33302 7.57563 4.24979 7.54283C4.16655 7.51003 4.07767 7.49394 3.98821 7.49549C3.89876 7.49703 3.81049 7.51619 3.72844 7.55185C3.64638 7.58751 3.57216 7.63898 3.51 7.70333C3.44784 7.76768 3.39896 7.84364 3.36616 7.92688C3.33336 8.01011 3.31727 8.099 3.31882 8.18845C3.32037 8.2779 3.33952 8.36618 3.37518 8.44823C3.41084 8.53028 3.46232 8.60451 3.52667 8.66667L6.08667 11.2267C6.14864 11.2892 6.22238 11.3387 6.30362 11.3726C6.38485 11.4064 6.47199 11.4239 6.56 11.4239C6.64801 11.4239 6.73514 11.4064 6.81638 11.3726C6.89762 11.3387 6.97136 11.2892 7.03333 11.2267L12.4733 5.78667C12.541 5.72424 12.595 5.64847 12.6319 5.56414C12.6689 5.4798 12.688 5.38873 12.688 5.29667C12.688 5.2046 12.6689 5.11353 12.6319 5.02919C12.595 4.94486 12.541 4.86909 12.4733 4.80667Z"
            fill="#2AD168"
          ></path>
        </svg>
      </div>
      <h3 class="mb-2 text-2xl font-semibold text-gray-900">Modal success</h3>
      <p class="mb-6 text-sm font-medium text-gray-500">
        This section has been published sucessfully.
      </p>
      <div class="-m-2 flex flex-wrap justify-end">
        <div class="w-full p-2 md:w-1/2">
          <button
            class="shadow-button flex w-full flex-wrap justify-center rounded-md border border-gray-200 bg-white px-4 py-2.5 text-base font-medium text-gray-500 hover:border-gray-300 hover:text-gray-600"
          >
            <p>Cancel</p>
          </button>
        </div>
        <div class="w-full p-2 md:w-1/2">
          <button
            class="hover:bg-green-600 border-green-500 shadow-button flex w-full flex-wrap justify-center rounded-md border bg-gray-500 px-4 py-2.5 text-base font-medium text-white"
          >
            <p>Confirm</p>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { usePreReg } from "../composables/prereg";

const prereg = usePreReg();
const showModal = prereg.modal;
</script>
