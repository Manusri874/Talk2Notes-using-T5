// // postcss.config.js
// export default {
//   plugins: {
//     // 🟢 FIX: Use the recommended Tailwind CSS PostCSS plugin package
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

export default {
  plugins: {
    "@tailwindcss/postcss": {}, 
    autoprefixer: {},
  },
}

