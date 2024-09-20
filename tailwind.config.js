/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.twig"],
  safelist: [
    {
      pattern: /col-span-\d+/,
      variants: ["sm"],
    },
  ],
  options: {},
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      grey: "#5F646C",
      primary: "#111111",
      // colorName: {
      //   default: "#FFFFFF",
      // },
    },
    fontFamily: {
      sans: ["Geist Sans", "sans-serif"],
      serif: ["serif"],
      mono: ["Geist Mono", "mono"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1" }],
      sm: ["0.875rem", { lineHeight: "1" }],
      base: ["1rem", { lineHeight: "1.5" }],
      lg: ["1.125rem", { lineHeight: "1.5" }],
      xl: ["1.25rem", { lineHeight: "1.3" }],
      "2xl": ["1.5rem", { lineHeight: "1.3" }],
      "3xl": ["1.875rem", { lineHeight: "1.3" }],
      "4xl": ["2.25rem", { lineHeight: "1" }],
      "5xl": ["2.8rem", { lineHeight: "1" }],
      "6xl": ["3rem", { lineHeight: "1" }],
      "7xl": ["4rem", { lineHeight: "1" }],
      "8xl": ["5rem", { lineHeight: "1" }],
      "9xl": ["6rem", { lineHeight: "1" }],
    },
    extend: {
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      fontSize: {
        "10xl": ["12rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base", // only generate global styles
      // strategy: "class", // only generate classes
    }),
  ],
};
