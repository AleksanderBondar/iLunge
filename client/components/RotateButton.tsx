import { Rotate3D } from 'lucide-react';
import React from 'react';
import { cx } from '../utils';
import { useAppStore } from '../stores';

export const RotateButton = () => {
    const { allowRotation, toggleRotation } = useAppStore();
    return (
        <button id="map-close-button" onClick={toggleRotation} className="flex items-center justify-center">
            <Rotate3D className={cx(allowRotation ? 'text-blue-500' : 'text-light-700_dark200', 'h-6 w-6')} />
        </button>
    );
};
