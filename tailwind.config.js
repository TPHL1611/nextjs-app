const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: "#FF3366",
                "gray-hover": "#EDF2F7",
            },
        },
        fontFamily: {
            "jet-regular": ['"JetBrain Regular"'],
            "jet-italic": ['"JetBrain Italic"'],
            "jet-bold": ['"JetBrain Bold"'],
            "jet-semibold": ['"JetBrain Semibold"'],
            "mt-regular": ['"Mt Regular"'],
            "mt-bold": ['"Mt Bold"'],
            "mt-semibold": ['"Mt SemiBold"'],
        },
    },
    plugins: [],
};
