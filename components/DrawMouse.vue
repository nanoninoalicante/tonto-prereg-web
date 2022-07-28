<script setup>
import { onMounted } from "vue";
onMounted(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let coord = { x: 0, y: 0 };

    document.addEventListener("mousedown", start);
    document.addEventListener("touchstart", start);
    document.addEventListener("mouseup", stop);
    document.addEventListener("touchend", stop);
    window.addEventListener("resize", resize);

    resize();

    function resize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
    function reposition(event) {
        coord.x = event.clientX - canvas.offsetLeft;
        coord.y = event.clientY - canvas.offsetTop;
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
    let currentWidth = 5;
    let maxWidth = 50;
    let minWidth = 4;
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
    function getColor(currentHue) {
        return `hsl(0, 100, 100)`;
    }
    function draw(event) {
        ctx.beginPath();
        ctx.lineWidth = getWidth(currentWidth);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "rgb(77, 255, 243)";
        ctx.moveTo(coord.x, coord.y);
        reposition(event);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
});
</script>
<template>
    <canvas id="canvas"></canvas>
</template>
<style>
canvas#canvas {
    width: 100vw;
    height: 100vh;
}
</style>
