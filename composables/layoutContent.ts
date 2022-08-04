import { computed } from "vue";
const images = [
    "cheerful-young-lady-wearing-headphones-using-mobi-2021-12-09-08-12-41-utc.jpg",
    "exercises-stretching-body-muscles-in-city-healthy-2021-09-02-07-22-45-utc.jpg",
    "happy-afro-man-using-mobile-smartphone-outdoor-2021-09-09-16-19-15-utc.jpg",
    "happy-man-at-home-smiling-and-listening-to-music-f-2022-07-26-05-17-25-utc.jpg",
    "happy-spanish-girl-in-airpods-is-singing-with-mobi-2022-06-06-23-53-18-utc.jpg",
    "modern-outdoor-workout-healthy-lifestyle-and-star-2021-09-02-17-13-06-utc.jpg",
    "outdoor-shot-of-caucasian-female-enjoys-listening-2021-08-30-23-54-36-utc.jpg",
    "pretty-caucasian-woman-in-wireless-headphones-usin-2021-12-09-08-17-52-utc.jpg",
    "smiling-girl-using-music-app-on-phone-2021-09-24-03-50-37-utc.jpg",
    "smiling-young-business-woman-using-her-free-hands-2021-08-27-09-31-39-utc.jpg",
    "young-woman-listening-music-smart-phone-drinking-c-2022-02-03-16-33-07-utc.jpg",
];
const walkthroughScreens = [
    {
        text: "AUDIO SOCIAL",
        imagePosition: "object-center",
        image: images[0],
    },
    {
        text: "AUDIO SOCIAL",
        imagePosition: "object-left",
        image: images[1],
    },
    {
        text: "AUDIO SOCIAL",
        imagePosition: "object-left",
        image: images[2],
    },
    {
        text: "AUDIO SOCIAL",
        imagePosition: "object-center",
        image: images[3],
    },
    {
        text: "AUDIO SOCIAL",
        imagePosition: "object-right",
        image: images[4],
    },
];

const filteredWalkthroughScreens = computed(() => {
    walkthroughScreens.shift();
    return walkthroughScreens;
});

export function useLayoutContent() {
    return { filteredWalkthroughScreens, walkthroughScreens, images };
}
