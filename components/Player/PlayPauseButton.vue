<script setup>
import { PlayIcon, PauseIcon } from "@heroicons/vue/solid";
import { usePlayerStore } from "~/stores/player";
import { useEventBus } from "@vueuse/core";
const playerStore = usePlayerStore();
/*
Events
 */
const bus = useEventBus("player_playpause_updated");

/*
Methods
 */
const play = () => {
    bus.emit(true);
    playerStore.playing = true;
};
const pause = () => {
    bus.emit(false);
    playerStore.playing = false;
};
</script>
<template>
    <div
        class="flex cursor-pointer justify-center rounded-full bg-teal-600 p-4 text-white hover:bg-teal-500 active:bg-teal-700"
    >
        <PlayIcon
            v-if="!playerStore.playing"
            @click="play"
            class="h-16 w-16"
        ></PlayIcon>
        <PauseIcon v-else @click="pause" class="h-16 w-16"></PauseIcon>
    </div>
</template>
