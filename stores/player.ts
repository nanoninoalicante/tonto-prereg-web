import { defineStore } from "pinia";
import { useAudioComposable } from "../composables/audioComposable";
const { calculateTimeInReadable } = useAudioComposable();
export const usePlayerStore = defineStore("player", {
    state: () => {
        return {
            currentPost: null,
            totalDurationInSeconds: 0,
            currentTimeInSeconds: 0,
            seekTime: 0,
            seeking: false,
            showSeekTime: false,
            playing: false,
            audioLoadedData: "",
        };
    },
    getters: {
        getCurrentTime() {
            return calculateTimeInReadable(this.currentTimeInSeconds);
        },
        getTotalDuration() {
            return calculateTimeInReadable(this.totalDurationInSeconds);
        },
    },
    actions: {},
});
