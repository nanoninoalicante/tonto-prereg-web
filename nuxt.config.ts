import { defineNuxtConfig } from "nuxt";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        primaryApiBaseUrl: process.env.PRIMARY_API_BASE_URL || "",
        primaryApiApiKey: process.env.PRIMARY_API_API_KEY || "",
        algoliaPreRegIndex: process.env.ALGOLIA_PREREG_INDEX || "",
        algoliaUsersIndex: process.env.ALGOLIA_USERS_INDEX || "",
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
        applicationId: process.env.ALGOLIA_APP_ID || "3C6JFEHDRS",
        apiKey:
            process.env.ALGOLIA_API_KEY || "338eb9bfb8821edcd55371fc1f177495",
    },
});
