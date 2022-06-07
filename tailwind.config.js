const colors = require("tailwindcss/colors");
module.exports = {
  content: [],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      teal: colors.teal,
      primary: {
        '500': "#109C90"
      }
    },
    extend: {
      backgroundImage: {
        hero: "url('/background-photo.jpg')",
      },
    },
  },
};
