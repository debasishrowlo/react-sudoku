const fontSize = {}

const pxToRem = (px, base = 16) => {
  return `${px / base}rem`
}

const minFontSize = 12
const maxFontSize = 70
let i = minFontSize
while (i <= maxFontSize) {
  fontSize[i] = pxToRem(i)
  i += 2
}

const borderRadius = [0, 2, 4, 6, 8, 12, 16, 24].reduce((acc, cur) => {
  acc[cur] = pxToRem(cur)
  return acc
}, {})
borderRadius["full"] = "9999px"

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      borderRadius,
      colors: {
        gray: {
          100: "#FAFAFA",
          200: "#F1F1F1",
          300: "#CFCFCF",
          400: "#101010",
        },
        orange: {
          100: "#FBAF85",
          200: "#D87D4A",
        },
        black: "#000000",
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      fontSize,
      spacing: {
        "4.5": pxToRem(18),
        "7.5": pxToRem(30),
        "22": pxToRem(88),
        "30": pxToRem(120),
      },
    }
  },
  plugins: [],
}