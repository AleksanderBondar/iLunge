import React from 'react';
import { AutoCompleteSearch } from './AutoCompleteSearch';
import { MapButton } from './MapButton';
import { GeoLocalizationButton } from './GeoLocationButton';
import { ThemeSwitcher } from './ThemeSwitcher';
import { RotateButton } from './RotateButton';

export const Search = () => {
    return (
        <div className="absolute left-1/2 top-6 -translate-x-1/2">
            <div className="relative flex gap-[1.2rem]">
                <GeoLocalizationButton />
                <MapButton />
                <RotateButton />
                <div className="w-[42rem]">
                    <AutoCompleteSearch />
                </div>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
