import { defineNuxtConfig } from "nuxt";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        primaryApiBaseUrl: process.env.PRIMARY_API_BASE_URL || "",
        primaryApiApiKey: process.env.PRIMARY_API_API_KEY || "",
    },
    ssr: true,
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/algolia",
        "@vueuse/nuxt",
        "nuxt-lodash",
    ],
    buildModules: ["@pinia/nuxt"],
    build: {
        transpile: ["@heroicons/vue"],
    },
    algolia: {
        instantSearch: true,
        lite: true,
        applicationId: "3C6JFEHDRS",
        apiKey: "338eb9bfb8821edcd55371fc1f177495",
    },
});
