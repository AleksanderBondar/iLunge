import Home from './pages/index';
import About from './pages/about/index';

import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './stores';

const Providers = ({ children }: { children: React.ReactNode }) => {
    const { mode } = useAppStore();

    const isDarkMode = mode === 'dark';
    const leafletDarkMode = isDarkMode
        ? ['.leaflet-tile { filter: var(--leaflet-tile-filter, none) }', '.leaflet-container { background: #303030 }']
        : [''];
    return (
        <>
            <style>
                {`
                    :root {
                        --leaflet-tile-filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
                    }
                    ${leafletDarkMode.join('')}
                `}
            </style>
            {children}
            <Toaster />
        </>
    );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Providers>
                <Home />
            </Providers>
        ),
    },
    {
        path: '/iframe',
        element: (
            <Providers>
                <Home />
            </Providers>
        ),
    },
    {
        path: '/about',
        element: (
            <Providers>
                <About />
            </Providers>
        ),
    },
]);

createRoot(document.getElementById('root') as Element).render(<RouterProvider router={router} />);
