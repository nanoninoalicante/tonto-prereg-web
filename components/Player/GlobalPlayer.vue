<script setup>
import PlayerSeeker from "./PlayerSeeker";
import PlayPauseButton from "./PlayPauseButton";
import SkipForwardIcon from "~/components/icons/SkipForwardIcon";
import SkipBackIcon from "~/components/icons/SkipBackIcon";
import { vAutoAnimate } from "~/directives/directives";
import { usePlayerStore } from "~/stores/player";
import AudioPlayerHolder from "./AudioPlayerHolder";
import BackSkipButton from "./BackSkipButton";
import TimeDisplay from "./TimeDisplay";
import { useEventBus } from "@vueuse/core";
const playerStore = usePlayerStore();

/*
Events
 */
const bus = useEventBus("player_backskip_updated");
const back = () => {
    bus.emit(-5);
};
const skip = () => {
    bus.emit(5);
};
</script>
<template>
<!--    <teleport to="body">-->
        <div class="w-full mb-4">
            <div
                class="
                    py-2
                    px-2
                    mx-auto
                    w-full
                    md:w-4/5
                    lg:w-[500px]
                    bg-white bg-opacity-0
                    backdrop-blur-lg
                    max-w-6xl
                    rounded-2xl
                    shadow-3xl
                "
            >
                <div class="flex flex-col justify-center items-center w-full py-4 px-2">
                    <AudioPlayerHolder />
                    <div
                        class="
                            flex flex-row
                            justify-center
                            items-center
                            w-full
                            mb-2
                        "
                        v-auto-animate
                    >
                        <div
                            class="
                                flex
                                w-1/4
                                justify-center
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <BackSkipButton @click="back">
                                <SkipBackIcon></SkipBackIcon>
                            </BackSkipButton>
                        </div>
                        <div
                            class="flex w-1/5 justify-start w-full mb-0 md:mb-0"
                        >
                            <TimeDisplay
                                >{{ playerStore.getCurrentTime }}
                            </TimeDisplay>
                        </div>
                        <div
                            class="
                                flex
                                w-1/5
                                justify-center
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <PlayPauseButton />
                        </div>
                        <div
                            class="
                                flex
                                w-1/5
                                justify-start
                                pl-5
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <TimeDisplay
                                >{{ playerStore.getTotalDuration }}
                            </TimeDisplay>
                        </div>
                        <div
                            class="
                                flex
                                w-1/5
                                justify-center
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <BackSkipButton @click="skip">
                                <SkipForwardIcon></SkipForwardIcon>
                            </BackSkipButton>
                        </div>
                    </div>
                    <div class="w-full">
                        <PlayerSeeker />
                    </div>
                </div>
            </div>
        </div>
<!--    </teleport>-->
</template>
