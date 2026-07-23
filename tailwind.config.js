/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    darkMode: "media",
    theme: {
      extend: {
        colors: {
          background: { DEFAULT: "#F7F9F6", dark: "#161612" },
          foreground: { DEFAULT: "#263D26", dark: "#EBF5EB" },
          card: { DEFAULT: "#FFFFFF", dark: "#1F1F1A" },
          "card-foreground": { DEFAULT: "#263D26", dark: "#EBF5EB" },
          primary: {
            DEFAULT: "#559754",
            dark: "#8DD486",
            foreground: "#FFFFFF",
            "foreground-dark": "#FFFFFF",
          },
          secondary: {
            DEFAULT: "#E8F5E8",
            dark: "#312F29",
            foreground: "#3E5D42",
            "foreground-dark": "#D4E6D4",
          },
          muted: {
            DEFAULT: "#F0F5ED",
            dark: "#28271F",
            foreground: "#7C8A7E",
            "foreground-dark": "#ADADAD",
          },
          accent: {
            DEFAULT: "#D6EDD2",
            dark: "#34291F",
          },
          destructive: {
            DEFAULT: "#F6F3F1",
            dark: "#291410",
            foreground: "#A73434",
            "foreground-dark": "#E8C2C2",
          },
          border: { DEFAULT: "#D4D7D4", dark: "#3D3D38" },
          input: { DEFAULT: "#D4D7D4", dark: "#3D3D38" },
          ring: { DEFAULT: "#8DD486", dark: "#B3EBA8" },
          success: {
            DEFAULT: "#5ABF40",
            dark: "#7DD46D",
          },
          "priority-low": {
            DEFAULT: "#E8EDD8",
            dark: "#382F1F",
            foreground: "#539753",
            "foreground-dark": "#C4DABD",
          },
          "priority-medium": {
            DEFAULT: "#F6F3E8",
            dark: "#3D351F",
            foreground: "#8A7229",
            "foreground-dark": "#F4E8C4",
          },
          "priority-high": {
            DEFAULT: "#F6EAEA",
            dark: "#3D2629",
            foreground: "#B34A4A",
            "foreground-dark": "#F4D4D4",
          },
        }
      },
    },
    plugins: [],
  }