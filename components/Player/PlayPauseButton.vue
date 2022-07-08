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
    <div class="cursor-pointer flex justify-center bg-teal-600 p-4 text-white rounded-full">
        <PlayIcon
            v-if="!playerStore.playing"
            @click="play"
            class="w-12 h-12"
        ></PlayIcon>
        <PauseIcon v-else @click="pause" class="w-12 h-12"></PauseIcon>
    </div>
</template>
