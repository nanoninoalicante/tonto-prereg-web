<script setup>
/*
Imports
 */
import { onMounted, ref, watch } from "vue";
import Hls from "hls.js";
import { usePlayerStore } from "~/stores/player";
import { useAudioComposable } from "~/composables/audioComposable";
const { convertSeekTimeToAudioTime, convertAudioTimeToSeekTime } =
    useAudioComposable();
import { useEventBus } from "@vueuse/core";
import { usePostStore } from "~/stores/posts";
import { useAlerts } from "~/composables/alerts";

/*
Store
 */
const playerStore = usePlayerStore();
const postStore = usePostStore();
const alertsStore = useAlerts();

/*
Refs
 */
const audioHolderRef = ref(null);
const audioRef = ref(null);

/*
Methods
 */
const audioLoaded = (event) => {
    console.log("audio loaded: ", audioRef.value?.duration);
    playerStore.totalDurationInSeconds = audioRef.value?.duration || 0;
    playerStore.currentTimeInSeconds = audioRef.value?.currentTime || 0;
    playerStore.seekTime = convertAudioTimeToSeekTime(
        audioRef.value?.currentTime || 0,
        audioRef.value?.duration || 0
    );
};

const timeUpdated = () => {
    console.log("timeupdated: ", audioRef.value?.currentTime);
    playerStore.currentTimeInSeconds = audioRef.value?.currentTime || 0;
    playerStore.seekTime = convertAudioTimeToSeekTime(
        audioRef.value?.currentTime || 0,
        audioRef.value?.duration || 0
    );
};

const loadHlsAudio = async ({ streamingUrl }) => {
    if (Hls.isSupported()) {
        const hls = new Hls();
        console.log("hls is supported: ", streamingUrl);
        hls.loadSource(streamingUrl);
        hls.attachMedia(audioRef.value);
    } else {
        console.log("hls not required");
        audioRef.value.setAttribute("src", streamingUrl);
    }
    return Promise.resolve("loadHlsAudio");
};

/*
Events
 */

const playerSeekerUpdatedBus = useEventBus("player_seeker_updated");
const playerSeekerUpdatedEventListener = (time) => {
    console.log(`seeker time updated: ${time}`);
    audioRef.value.currentTime = convertSeekTimeToAudioTime(
        time,
        audioRef.value?.duration || 0
    );
};
const unsubscribeFromSeekerUpdatedBus = playerSeekerUpdatedBus.on(
    playerSeekerUpdatedEventListener
);

const playerBackSkipUpdatedBus = useEventBus("player_backskip_updated");
const playerBackSkipUpdatedListener = (time) => {
    console.log(`back and skip updated: ${time}`);
    audioRef.value.currentTime = audioRef.value.currentTime + time;
};
const unsubscribeFromBackSkipUpdatedBus = playerBackSkipUpdatedBus.on(
    playerBackSkipUpdatedListener
);

const playPauseUpdatedBus = useEventBus("player_playpause_updated");
const playPauseUpdatedListener = (isPlaying) => {
    console.log(`play pause button: ${isPlaying}`);
    if (isPlaying) {
        audioRef.value.play();
    } else {
        audioRef.value.pause();
    }
};
const unsubscribePlayPauseUpdatedBus = playPauseUpdatedBus.on(
    playPauseUpdatedListener
);

/*
Watch
 */
watch(
    () => playerStore.seeking,
    (newVal) => {
        if (newVal) {
            audioRef.value.pause();
        } else {
            audioRef.value.play();
        }
    }
);

/*
Mounted
 */
onMounted(() => {
    console.log("audioplayer holder: ", postStore.getPost?.streamingUrl);
    if (postStore.getPost?.streamingUrl) {
        loadHlsAudio({ streamingUrl: postStore.getPost?.streamingUrl });
    } else {
        console.log("cannot load player");
        alertsStore.addAlert({ message: "Cannot load audio", type: "error" });
    }
});
</script>
<template>
    <div ref="audioHolderRef" class="m-0 h-0 w-0 p-0" :id="'audio-' + '1'">
        <audio
            ref="audioRef"
            id="globalAudioPlayer"
            preload="metadata"
            @playing="playerStore.playing = true"
            @pause="playerStore.playing = false"
            @timeupdate="timeUpdated"
            @loadedmetadata="audioLoaded"
        ></audio>
    </div>
</template>
