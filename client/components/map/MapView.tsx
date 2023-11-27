import React, { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Map as MapType } from 'leaflet';
import { useAppStore, useMapStore, useSocketStore } from '../../stores';
import { pickGoodIcon } from './utils';
import { Minimap } from './MiniMap';

export const MapView = ({ setMap }: { setMap: (map: MapType) => void }) => {
    const { stations, selectedStation, airQualities, selectStation, location } = useAppStore();
    const { goTo, close } = useMapStore();
    const { users } = useSocketStore();

    const dblclick = async (id: number) => {
        if (window.innerWidth < 640) close();
        selectStation(id);
        await goTo('station');
    };
    const onButtonClick = (id: number) => {
        if (window.innerWidth < 640) close();
        selectStation(id);
    };

    const display = useMemo(
        () => (
            <MapContainer
                markerZoomAnimation
                preferCanvas
                fadeAnimation
                className="h-full w-full"
                center={[51.91, 19.14]}
                zoom={5.5}
                ref={setMap}
            >
                <Minimap />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                    <Marker
                        icon={pickGoodIcon('user')}
                        opacity={0.8}
                        position={[parseFloat(location.lat || ''), parseFloat(location.lon || '')]}
                    >
                        <Popup>
                            <span>Twoja lokalizacja</span>
                        </Popup>
                    </Marker>
                )}
                {users.map(({ city, lat, lon }) => (
                    <Marker icon={pickGoodIcon('users')} opacity={0.8} position={[parseFloat(lat), parseFloat(lon)]}>
                        <Popup>
                            <span>{city}</span>
                        </Popup>
                    </Marker>
                ))}
                {Object.values(stations).map(station =>
                    station.map(({ id, gegrLat, gegrLon, stationName }) => {
                        const isSelected = selectedStation?.id === id;
                        const airQuality = airQualities ? airQualities[id] : null;
                        return (
                            <Marker
                                eventHandlers={{ dblclick: async () => await dblclick(id) }}
                                opacity={isSelected ? 0.8 : 0.5}
                                icon={pickGoodIcon(
                                    isSelected
                                        ? 'selected'
                                        : airQuality?.st.indexLevel?.id
                                        ? airQuality.st.indexLevel.id === -1
                                            ? 0
                                            : airQuality.st.indexLevel.id
                                        : 'default',
                                )}
                                position={[parseFloat(gegrLat), parseFloat(gegrLon)]}
                            >
                                <Popup>
                                    <div className="flex flex-col">
                                        <span>{stationName}</span>
                                        <button onClick={() => onButtonClick(id)}>Zmień stacje</button>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    }),
                )}
            </MapContainer>
        ),
        [stations, airQualities, selectedStation, users],
    );

    return <div className="h-full w-full bg-white">{display}</div>;
};
