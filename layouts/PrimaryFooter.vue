<template>
    <div>
        <teleport to="body">
            <footer
                class="footer fixed bottom-0 right-0 z-10 w-full rounded-t-xl bg-teal-600 bg-opacity-40 p-1 backdrop-blur-md"
            >
                <div class="w-full px-2 text-right">
                    <span class="text-sm font-medium text-teal-800"
                        ><a href="https://www.gettonto.com" class="underline">Tonto</a> ©
                        {{ year }} All Rights Reserved</span
                    >
                </div>
            </footer>
        </teleport>
    </div>
</template>
<script setup>
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>
