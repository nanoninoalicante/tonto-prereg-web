const colors = require("tailwindcss/colors");
module.exports = {
    content: [],
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            grey: colors.gray,
            blue: colors.blue,
            lime: colors.lime,
            emerald: colors.emerald,
            red: colors.red,
            orange: colors.orange,
            indigo: colors.indigo,
            yellow: colors.yellow,
            teal: colors.teal,
            twitter: "#1DA1F2",
            primary: {
                500: "#109C90",
                700: "#1F6962",
            },
            warning: {
                200: "#FFAE71",
                500: "#FF6D00",
            },
        },
    },
};
