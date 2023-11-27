import React, { useEffect } from 'react';
import { useAppStore, useSocketStore } from '../stores/';
import { Search } from '../components/Search';
import { LungCanvas } from '../components/lungCanvas';
import { AirQualityInfo } from '../components/AirQualityInfo';
import { Map } from '../components/map';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { MapButton } from '../components/MapButton';
import { io } from 'socket.io-client';
import { AirQuality, Stations } from '../../types/front';

declare global {
    interface Window {
        __INITIAL_DATA__: {
            context: { iframe: boolean; language: string };
            stations: { timestamp: number; stations: Stations };
            airQualities: { timestamp: number; qualities: Record<string, AirQuality> };
        };
    }
}

const socket = io();

function Home() {
    const iFrameAPP = window?.__INITIAL_DATA__?.context?.iframe;
    const { initState, location } = useAppStore();
    const { setUsers, setConnected, isConnected } = useSocketStore();
    const [usersMousePositions, setUsersMousePositions] = React.useState<{ id: string; x: number; y: number }[]>([]);

    useEffect(() => {
        initState(window?.__INITIAL_DATA__);

        try {
            const onConnect = () => setConnected(true);
            const onDisconnect = () => setConnected(false);
            const onUsers = users => setUsers(users);
            const onMousePositions = usersMousePositions => setUsersMousePositions(usersMousePositions);
            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('users', onUsers);
            socket.on('mousePositions', onMousePositions);

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
                socket.off('users', onUsers);
                socket.off('mousePositions', onMousePositions);
            };
        } catch (error) {
            setConnected(false);
        }
    }, []);

    useEffect(() => {
        if (isConnected && location && location.lat && location.lon) {
            const data = {
                city: location.address.city,
                lat: location.lat,
                lon: location.lon,
            };
            socket.emit('userAdd', data);
        }
    }, [location, isConnected]);

    useEffect(() => {
        if (!isConnected) return;
        const handleMouseMove = e => {
            const data = { x: e.clientX, y: e.clientY };
            socket.emit('mouseMove', data);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isConnected]);

    const memoMousesPositions = React.useMemo(() => {
        return usersMousePositions.map((user, index) => {
            const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'];
            const color = colors[index % colors.length];
            return (
                <div
                    key={index}
                    className={`bg-light-700_dark200 pointer-events-none fixed z-[10000] h-2 w-2 rounded-full bg-opacity-50 ${color}`}
                    style={{ left: user.x - 4, top: user.y - 7 }}
                />
            );
        });
    }, [usersMousePositions]);

    return iFrameAPP ? (
        <div className="background-light900_dark200 relative h-screen overflow-hidden">
            <LungCanvas />
            <MapButton />
            <Map />
        </div>
    ) : (
        <div className="background-light900_dark200 relative h-screen overflow-hidden">
            {memoMousesPositions}
            <LungCanvas />
            <Search />
            <AirQualityInfo />
            <Map />
            <div id={'container'} className="z-100 absolute right-6 top-6 flex gap-2 ">
                <MapButton />
                <ThemeSwitcher />
            </div>
        </div>
    );
}

export default Home;
