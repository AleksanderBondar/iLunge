import React from 'react';
import { AutoCompleteSearch } from './AutoCompleteSearch';
import { MapButton } from './MapButton';
import { GeoLocalizationButton } from './GeoLocationButton';
import { ThemeSwitcher } from './ThemeSwitcher';
import { RotateButton } from './RotateButton';

export const Search = () => {
    return (
        <div className="absolute left-1/2 top-6 flex w-screen -translate-x-1/2 justify-center">
            <div className="relative flex w-full max-w-[1024px] flex-col items-center justify-center gap-8 px-8">
                <div className="flex w-full flex-col-reverse gap-4 sm:flex-row sm:items-center sm:gap-8">
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-4">
                            <GeoLocalizationButton />
                            <MapButton />
                            <RotateButton />
                        </div>
                        <div className="sm:hidden">
                            <ThemeSwitcher />
                        </div>
                    </div>
                    <div className="w-full">
                        <AutoCompleteSearch />
                    </div>
                    <div className="hidden sm:block">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
};
