/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('./assets/bg-main.jpg')",
        'login': "url('./assets/bg-login.jpg')",
        'signup': "url('./assets/bg-signup.jpg')",
      },
      gridTemplateColumns: {
        'form':"repeat(auto-fit, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [

  ],
}