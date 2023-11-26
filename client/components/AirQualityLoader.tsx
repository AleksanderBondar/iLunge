import React, { FC } from 'react';
const mockedArray = ['Ogólna', 'o3', 'so2', 'no2', 'pm25', 'pm10'];

export const AirQualityLoader = () => {
    return (
        <>
            {mockedArray.map((data, index) => (
                <div key={data} className="flex items-center justify-between gap-6">
                    <span>{data}</span>
                    {index !== 0 && (
                        <span className="background-light700_dark400 h-2 w-10 animate-pulse rounded-full" />
                    )}
                </div>
            ))}
        </>
    );
};
