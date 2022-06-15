<template>
  <div v-if="showCookies" class="fixed bottom-0 left-0 right-0 mx-8">
    <div class="relative z-50 rounded-t-3xl bg-gray-100 px-8 py-5 md:px-14">
      <div class="-mx-4 flex flex-wrap items-center">
        <div class="mb-6 w-full px-4 md:w-1/3 lg:mb-0 xl:w-1/4">
          <div class="flex items-center">
            <p class="font-heading text-3xl font-medium leading-10">
              Manage Cookies
            </p>
          </div>
        </div>
        <div
          class="mb-6 flex w-full items-center px-4 md:w-1/3 lg:mb-0 xl:w-5/12"
        >
          <p class="text-base leading-7">
            By clicking Accept, you agree to the storing of cookies on your
            device to enhance site navigation. Etiam commodo ipsum et imperdiet
            imperdiet.
          </p>
        </div>
        <div class="w-full px-4 md:w-1/3 lg:ml-auto lg:flex lg:max-w-max">
          <a
            class="font-heading mr-4 mb-2 inline-block w-full rounded-xl bg-blue-500 py-3 px-8 text-center text-xl font-medium leading-7 tracking-tighter text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 lg:mb-0"
            @click="acceptCookies"
            >Got It</a
          ><a
            class="font-heading inline-block w-full rounded-xl bg-white py-3 px-10 text-center text-xl font-medium leading-7 tracking-tighter hover:bg-gray-50 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            href="#"
            >More</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showCookies = ref(true);
const acceptCookies = () => {
  showCookies.value = false;
};

</script>
