import { defineNuxtConfig } from "nuxt";
import ChooseHandlePage from "./pages/index.vue";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/algolia"],
  buildModules: ["@pinia/nuxt"],
  algolia: {
    instantSearch: true,
    lite: true,
    applicationId: "3C6JFEHDRS",
    apiKey: "338eb9bfb8821edcd55371fc1f177495",
  },
});
