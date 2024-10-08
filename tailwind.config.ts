import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-gray": "#3a4358",
        "light-gray": "#cfd8dc",
        "border-gray": "#4b556c",
        "link-color": "#2296f3",

        "m-green": "#0098ba",
        "m-red": "#e73939",
        "m-blue": "#2296f3",
      },
    },
  },
  plugins: [],
};
export default config;
