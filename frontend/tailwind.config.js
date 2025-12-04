/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF6B6B', // Coral Red
                secondary: '#4ECDC4', // Turquoise
                accent: '#FFE66D', // Sunny Yellow
                background: '#F7FFF7', // Mint Cream
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
