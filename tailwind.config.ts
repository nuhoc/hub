import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#489851",
        secondary: "#FFDE59",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        shrikhand: ["var(--font-shrikhand)"],
        raleway: ["var(--font-raleway)"],
      },
      backgroundImage: {
        "topo-pattern": "url('../../public/topo-pattern.svg')",
        "white-mountains": "url('../../public/white-mountains.webp')",
      },
    },
  },
  plugins: [],
} satisfies Config;
