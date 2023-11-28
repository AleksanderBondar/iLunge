import React from 'react';
import { AutoCompleteSearch } from './AutoCompleteSearch';

import { GeoLocalizationButton } from './GeoLocationButton';
import { RotateButton } from './RotateButton';
import { UserIcon } from './UserIcon';

export const Search = () => {
    return (
        <div className="absolute left-1/2 top-6 flex w-screen -translate-x-1/2 justify-center">
            <div className="relative flex w-full max-w-[1024px] flex-col items-center justify-center gap-8 px-8">
                <div className="flex w-full flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:gap-8">
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-4">
                            <UserIcon />
                        </div>
                        <div className="flex gap-4">
                            <RotateButton />
                        </div>
                    </div>
                    <div className="w-full max-w-[300px] ">
                        <AutoCompleteSearch />
                    </div>
                    <div className="hidden sm:block">
                        <GeoLocalizationButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
