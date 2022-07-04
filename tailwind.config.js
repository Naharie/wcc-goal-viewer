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

                "dim-selected": "var(--dim-selected)",
                "dim-not-selected": "var(--dim-not-selected)",

                "error": "var(--error)",
            },
        },
    },
    plugins: [],
}