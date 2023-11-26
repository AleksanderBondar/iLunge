/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./client/index.html', './client/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#FF7000',
                    100: '#FFF1E6',
                },
                dark: {
                    100: '#000000',
                    200: '#0F1117',
                    300: '#151821',
                    400: '#212734',
                    500: '#101012',
                },
                light: {
                    900: '#FFFFFF',
                    800: '#F4F6F8',
                    850: '#FDFDFD',
                    700: '#DCE3F1',
                    500: '#7B8EC8',
                    400: '#858EAD',
                },
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
