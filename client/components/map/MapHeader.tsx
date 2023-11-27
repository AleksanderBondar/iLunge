import React, { useCallback, useEffect, useState } from 'react';
import { useAppStore, useMapStore } from '../../stores';
import { Map } from 'leaflet';
import { X as Cross } from 'lucide-react';

export const MapHeader = ({ map }: { map: Map }) => {
    const { selectedStation, stations, location } = useAppStore();
    const { moveMap } = useMapStore();
    const [position, setPosition] = useState(() => map.getCenter());

    const onClick = useCallback(() => {
        map.setView([51.91, 19.14], 5.5);
    }, [map]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    const goToSelectedStation = useCallback(() => {
        if (selectedStation) {
            const lat = parseFloat(selectedStation.gegrLat);
            const lng = parseFloat(selectedStation.gegrLon);
            const zoom = 9;
            map.setView([lat, lng], zoom, {
                animate: true,
                duration: 0.5,
                easeLinearity: 0.2,
            });
        }
    }, [map, selectedStation]);

    const listClosestStationsToCurrentLocation = (howMany: number) => {
        if (location) {
            const lat = parseFloat(location.lat);
            const lng = parseFloat(location.lon);
            const stationsArray = Object.values(stations);
            const closestStations = stationsArray
                .map(station => {
                    const distance = Math.sqrt(
                        Math.pow(parseFloat(station[0].gegrLat) - lat, 2) +
                            Math.pow(parseFloat(station[0].gegrLon) - lng, 2),
                    );
                    return { distance, ...station };
                })
                .sort((a, b) => a.distance - b.distance)
                .slice(0, howMany);
            return closestStations;
        }
        return [];
    };

    useEffect(() => {
        if (selectedStation && moveMap === 'station') goToSelectedStation();
    }, [selectedStation, moveMap]);

    useEffect(() => {
        map.on('move', onMove);
        return () => {
            map.off('move', onMove);
        };
    }, [map, onMove]);

    return (
        <div className="background-light900_dark200 text-light-700_dark200 relative flex w-full items-start justify-between px-[0.4rem] py-[0.8rem]">
            <div className="flex flex-col items-start">
                <div className="flex flex-col gap-2 p-4">
                    <p>latitude: {position.lat.toFixed(2)}</p>
                    <p>longitude: {position.lng.toFixed(2)}</p>
                </div>
                <div className="flex gap-4 p-2">
                    <button onClick={onClick}>Reset view</button>
                    <button onClick={goToSelectedStation}>Go to current station</button>
                    <button
                        onClick={() => {
                            const closestStations = listClosestStationsToCurrentLocation(3);
                        }}
                    >
                        Closest stations
                    </button>
                </div>
            </div>
            {/* <button onClick={close}>
                <Cross className="h-6 w-6" />
            </button> */}
        </div>
    );
};
