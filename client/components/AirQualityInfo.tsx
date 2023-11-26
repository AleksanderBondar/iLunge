import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { AirQualityLoader } from './AirQualityLoader';
import { airQualityColors } from '../constans';

export const AirQualityInfo = () => {
    const { airQuality, qualityLoading } = useAppStore();
    console.log(airQuality);
    return (
        <div className="text-light-700_dark200 absolute left-2 top-4 flex flex-col gap-2 rounded-xl px-6 py-4 text-sm lg:left-10 lg:top-[50%] lg:-translate-y-1/2">
            <h2 className="text-base">Jakość powietrza</h2>
            {qualityLoading || !airQuality ? (
                <AirQualityLoader loading={qualityLoading} />
            ) : (
                Object.entries(airQuality)
                    .reverse()
                    .map(([key, value]) => {
                        return (
                            <div key={key} className="flex justify-between gap-6">
                                <span>{key === 'st' ? 'Ogólna' : key}</span>
                                <span
                                    style={{
                                        ...((value.indexLevel?.id ?? '') in airQualityColors
                                            ? { color: `${airQualityColors[value.indexLevel?.id!]}` }
                                            : {}),
                                    }}
                                >
                                    {!value.indexLevel?.indexLevelName ||
                                    value.indexLevel?.indexLevelName.toLowerCase().includes('brak')
                                        ? '-'
                                        : value.indexLevel?.indexLevelName.replace(/.$/, 'a')}
                                </span>
                            </div>
                        );
                    })
            )}
        </div>
    );
};

//key in object
