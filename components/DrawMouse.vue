<script setup>
import { onMounted } from "vue";
import { useEventBus } from "@vueuse/core";
import { useMousePressed } from "@vueuse/core";
import { useGeneral } from "~/composables/general";
const { getRandomInt } = useGeneral();
const colorR = ref(155);
const colorG = ref(155);
const colorB = ref(155);

/*
Events
 */
const bus = useEventBus("player_playpause_updated");

const { pressed } = useMousePressed();
watch(pressed, (value) => {
    bus.emit(value);
    colorR.value = getRandomInt(0, 255);
    colorG.value = getRandomInt(0, 255);
    colorB.value = getRandomInt(0, 255);
});

onMounted(() => {
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll =
        window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(LeftScroll, TopScroll);
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let coord = { x: 0, y: 0 };
    const scale = 2;

    document.addEventListener("mousedown", start);
    document.addEventListener("touchstart", start);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchend", stop);
    window.addEventListener("resize", resize);

    resize();

    function resize() {
        ctx.canvas.width = window.innerWidth * scale;
        ctx.canvas.height = window.innerHeight * scale;
    }
    function reposition(event) {
        coord.x = event.clientX * scale || event.pageX * scale;
        coord.y = event.clientY * scale || event.pageY * scale;
    }
    function start(event) {
        document.addEventListener("mousemove", draw);
        document.addEventListener("touchmove", draw);
        reposition(event);
    }
    function stop() {
        document.removeEventListener("mousemove", draw);
        document.removeEventListener("touchmove", draw);
    }
    let currentWidth = 5 * scale;
    let maxWidth = 50 * scale;
    let minWidth = 4 * scale;
    let isGoingUp = true;
    function getWidth(current) {
        if (isGoingUp) {
            currentWidth++;
            if (current >= maxWidth) {
                isGoingUp = false;
            }
        } else {
            currentWidth--;
            if (current <= minWidth) {
                isGoingUp = true;
            }
        }
        return currentWidth;
    }
    function getColor(r, g , b) {
        return `rgb(${r}, ${g}, ${b})`;
    }
    function draw(event) {
        console.log("drawing ", getColor(colorR.value, colorG.value, colorB.value));
        ctx.beginPath();
        ctx.lineWidth = getWidth(currentWidth);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = getColor(colorR.value, colorG.value, colorB.value);
        ctx.moveTo(coord.x, coord.y);
        reposition(event);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
});
</script>
<template>
    <canvas id="canvas" class="z-0 w-[100vw] h-[100vh] overflow-visible fixed left-0 top-0 bg-gray-50 bg-opacity-40"></canvas>
</template>