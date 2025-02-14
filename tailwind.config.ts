export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"],
      },
      colors: {
        customGold: "#FFCF82",
      },
    },
  },
  plugins: [],
};
 