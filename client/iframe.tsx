import Home from './pages/index';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

const IFrame = () => {
    return (
        <>
            <Home />
            <Toaster />
        </>
    );
};

createRoot(document.getElementById('root') as Element).render(<IFrame />);
