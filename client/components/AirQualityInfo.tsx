import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { AirQualityLoader } from './AirQualityLoader';
import { airQualityColors } from '../constans';

export const AirQualityInfo = () => {
    const { airQuality, qualityLoading, setHoveredQualityIndex, selectedStation } = useAppStore();
    return (
        <aside className="text-light-700_dark200 z-9 absolute bottom-4 left-2 flex flex-col rounded-xl px-6 py-4 text-sm lg:bottom-[50%] lg:left-10 lg:translate-y-1/2 lg:gap-2">
            {selectedStation?.city.name ? (
                <>
                    <h3>Wybrana stacja : {selectedStation?.city.name ?? '-'}</h3>
                    <h3 className="border-light700_dark400  border-b pb-3">{selectedStation?.addressStreet ?? '-'}</h3>
                </>
            ) : null}
            <h2 className="text-base">Jakość powietrza</h2>
            {qualityLoading || !airQuality ? (
                <AirQualityLoader loading={qualityLoading} />
            ) : (
                Object.entries(airQuality)
                    .reverse()
                    .map(([key, value]) => {
                        return (
                            <div
                                key={key}
                                className="relative z-50 flex cursor-pointer justify-between gap-6"
                                onMouseOver={() => {
                                    setHoveredQualityIndex(value.indexLevel?.id);
                                }}
                                onMouseOut={() => setHoveredQualityIndex(undefined)}
                            >
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
                                <span
                                    style={{
                                        ...((value.indexLevel?.id ?? '') in airQualityColors
                                            ? {
                                                  background: `${airQualityColors[value.indexLevel?.id!]}`,
                                                  width: `calc(50px - ${(value.indexLevel?.id ?? 0) * 10}px)`,
                                              }
                                            : {}),
                                    }}
                                    className={`absolute left-[calc(100%+10px)] top-1/2 h-1 -translate-y-1/2`}
                                />
                            </div>
                        );
                    })
            )}
        </aside>
    );
};

//key in object
