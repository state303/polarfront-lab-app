import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ['"Pretendard Variable"', "Pretendard", "sans-serif"],
                serif: ['"Pretendard Variable"', "Pretendard", "sans-serif"],
            },
        },
    },
    plugins: [
        iconsPlugin({
            collections: getIconCollections(["lucide"]),
        }),
        plugin(function ({ addBase }) {
            addBase({
                "@supports (height: 100dvh)": { ":root": { "--viewport-height": "100dvh" } },
            });
        }),
        typography,
    ],
};

export default tailwindConfig;
