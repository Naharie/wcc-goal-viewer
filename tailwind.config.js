/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "not-selected": "var(--not-selected)",
                "selected": "var(--selected)",
                "error": "var(--error)"
            },
        },
    },
    plugins: [],
}