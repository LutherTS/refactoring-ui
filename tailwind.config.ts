import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}"],
  theme: {},
  plugins: [
    // require("@tailwindcss/forms")({
    // strategy: 'base', // only generate global styles // NO
    // strategy: "class", // only generate classes // YES
    // }),
  ],
};
export default config;
