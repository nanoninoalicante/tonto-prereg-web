<template>
  <div class="h-screen">
    <Modal></Modal>
    <div class="flex h-screen flex-wrap md:mb-0">
      <div
        class="display-none bg-lime-600 w-full bg-[url('/background-photo.jpg')] bg-cover bg-center md:mb-0 md:h-screen md:w-1/2"
      ></div>
      <div class="h-screen w-full bg-primary-500 md:mb-0 md:w-1/2">
        <div
          class="container mx-auto flex h-screen flex-col items-center justify-start pt-[15vh] space-y-8 px-8 md:px-12 lg:px-32"
        >
          <div class="flex w-full justify-start">
            <img
              src="/tonto_logotipo_horizontal_white@2x.png"
              alt="Go Tonto"
              class="m-0 w-56 p-0"
            />
          </div>
          <div class="w-full">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <Cookies></Cookies>
  </div>
</template>
<script setup>
import Modal from "~/components/Modal";
import Cookies from "~/components/Cookies.vue";
</script>
