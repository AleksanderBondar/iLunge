import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: './client',
    plugins: [react()],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        assetsDir: 'assets',
        assetsInlineLimit: 0,
    },
});