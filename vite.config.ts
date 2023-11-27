import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    root: './client',
    plugins: [react()],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        assetsDir: 'assets',
        assetsInlineLimit: 0,
        rollupOptions: {
            input: {
                main: resolve(__dirname, './client/index.html'),
                about: resolve(__dirname, './client/about.html'),
            },
        },
    },
});
