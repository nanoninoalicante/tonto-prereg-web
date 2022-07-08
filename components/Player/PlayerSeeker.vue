<script setup>
import { vAutoFocus } from "~/directives/directives";
import { usePlayerStore } from "~/stores/player";
import { computed, ref, watch } from "vue";
import { useEventBus } from "@vueuse/core";
import { useMouse, useElementBounding } from "@vueuse/core";
import { useAudioComposable } from "~/composables/audioComposable";
const { convertSeekTimeToAudioTime, calculateTimeInReadable } =
    useAudioComposable();
const { x, y, sourceType } = useMouse();
const playerStore = usePlayerStore();

const seekTooltip = ref(null);
const seekerSliderRef = ref(null);
const { top, left, right } = useElementBounding(seekerSliderRef);
const { width } = useElementBounding(seekTooltip);

const seekerToolTipPositionStyle = computed(() => {
    let xValue = x.value;
    if (x.value <= left.value) {
        xValue = left.value;
    }
    if (x.value >= right.value) {
        xValue = right.value;
    }
    let topOffset = 70;
    return `left: ${xValue - width.value / 2}px; top: ${
        top.value - topOffset
    }px;`;
});
const movingSeekerNewValue = computed(() => {
    return calculateTimeInReadable(
        convertSeekTimeToAudioTime(
            playerStore.seekTime,
            playerStore.totalDurationInSeconds
        )
    );
});

/*
Events
 */
const playerSeekerUpdatedBus = useEventBus("player_seeker_updated");

/*
Methods
 */
const change = () => {
    console.log("seeker changed: ", playerStore.seekTime);
    playerSeekerUpdatedBus.emit(playerStore.seekTime);
};
</script>
<template>
    <teleport to="body">
        <div
            v-if="playerStore.seeking"
            ref="seekTooltip"
            :style="seekerToolTipPositionStyle"
            class="
                absolute
                z-10
                px-4
                py-2
                bg-teal-700
                text-white
                rounded-2xl
                shadow-xl
                font-medium
                text-xl
            "
        >
            {{ movingSeekerNewValue }}
        </div>
    </teleport>
    <input
        v-model="playerStore.seekTime"
        v-auto-focus
        :id="'seeker-'"
        type="range"
        ref="seekerSliderRef"
        name="rng"
        min="0"
        step="0.1"
        class="appearance-none bg-teal-300 rounded-full h-1 active:bg-teal-500"
        @mousedown="playerStore.seeking = true"
        @mouseup="playerStore.seeking = false"
        @touchmove="playerStore.seeking = true"
        @touchstart="playerStore.seeking = true"
        @change="change"
        @touchend="playerStore.seeking = false"
        style="width: 100%"
    />
</template>
