import React from 'react';
import { MapIcon } from 'lucide-react';
import { useMapStore } from '../stores';
import { cx } from '../utils';
import { HoverInfo } from './ui/HoverInfo';

export const MapButton = () => {
    const { isOpen, toggle } = useMapStore();
    return (
        <button id="map-close-button" onClick={toggle} className="flex items-center justify-center">
            <HoverInfo infoText="Mapa">
                <MapIcon className={cx(isOpen ? 'text-blue-500' : 'text-light-700_dark200', 'h-6 w-6')} />
            </HoverInfo>
        </button>
    );
};
