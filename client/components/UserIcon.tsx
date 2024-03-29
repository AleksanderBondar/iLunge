import { UserIcon as Icon } from 'lucide-react';
import React from 'react';
import { cx } from '../utils';
import { useAppStore } from '../stores';

export const UserIcon = () => {
    const { visibility, toggleVisibility } = useAppStore();
    return (
        <button id="map-close-button" onClick={toggleVisibility} className="flex items-center justify-center">
            <Icon className={cx(visibility ? 'text-blue-500' : 'text-light-700_dark200', 'h-6 w-6')} />
        </button>
    );
};
