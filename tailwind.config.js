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
      primary: "#E00000",
      secondary: "#313144",
      red: {
        default: "#E00000",
        light: "#FE5858",
        lighter: "#FFD6D6",
      },
      grey: {
        default: "#C4C4C4",
        light: "#D8D8D8",
        lighter: "#E5E5E5",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["serif"],
      mono: ["Space Mono", "mono", "monospace"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.5" }],
      sm: ["0.875rem", { lineHeight: "1.5" }],
      base: ["1rem", { lineHeight: "1.5" }],
      lg: ["1.1rem", { lineHeight: "1.45" }],
      xl: ["1.72rem", { lineHeight: "1.44" }],
      "2xl": ["2.5rem", { lineHeight: "1.48" }],
      "3xl": ["2.875rem", { lineHeight: "1.05" }],
      "4xl": ["3.5rem", { lineHeight: "1.48" }],
      "5xl": ["4.1rem", { lineHeight: "0.88" }],
      "6xl": ["4.5rem", { lineHeight: "1.48" }],
      "7xl": ["5rem", { lineHeight: "1.48" }],
      "8xl": ["5.5rem", { lineHeight: "1.48" }],
      "9xl": ["6rem", { lineHeight: "1.48" }],
    },
    extend: {
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
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
