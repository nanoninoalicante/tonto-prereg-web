<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
definePageMeta({
  transition: {
    name: "page",
  },
});
useHead({
  title: "Secure your handle now - PreReg with Tonto now.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  script: [
    { src:'https://www.googletagmanager.com/gtm.js?id=GTM-TV653HH', async: true }
  ],
  meta: [
    {
      name: "description",
      content: "Secure your handle now - PreReg with Tonto now.",
    },
  ],
});

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease-in;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
/* "page" is hardcoded in nuxt3 page transitions atm */
.page-enter-from{
  opacity: 0;
  transform: translateX(-10px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.layout-enter-from{
  opacity: 0;
  transform: translateX(-10px);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}
</style>
