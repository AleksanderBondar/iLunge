import Home from './pages/index';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root') as Element).render(
    <>
        <Home />
        <Toaster />
    </>,
);
