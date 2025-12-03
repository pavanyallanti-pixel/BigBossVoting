/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9fa',
                    100: '#d6f0f3',
                    200: '#afe0e6',
                    300: '#7cc8d3',
                    400: '#46a9b9',
                    500: '#21808d',
                    600: '#1d7480',
                    700: '#1a6873',
                    800: '#195660',
                    900: '#174851',
                },
                secondary: {
                    500: '#f97316',
                    600: '#ea580c',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
