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
import _ from 'lodash';

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
    const { visibility, initState, location } = useAppStore();
    const { setUsers, setConnected, isConnected } = useSocketStore();
    const [usersMousePositions, setUsersMousePositions] = React.useState<{ id: string; x: number; y: number }[]>([]);

    useEffect(() => {
        initState(window?.__INITIAL_DATA__);

        try {
            const onConnect = () => setConnected(true);
            const onDisconnect = () => setConnected(false);
            const onUsers = users => setUsers(users);
            const onMousePositions = usersMousePositions => setUsersMousePositions(usersMousePositions);
            const onMouseClick = click => {
                //create small circle and create boom animation
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.style.left = click.x - 3 + 'px';
                circle.style.top = click.y - 6 + 'px';
                document.body.appendChild(circle);
                circle.addEventListener('animationend', () => {
                    circle.remove();
                });
            };
            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('users', onUsers);
            socket.on('mousePositions', onMousePositions);
            socket.on('mouseClick', onMouseClick);

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
                socket.off('users', onUsers);
                socket.off('mousePositions', onMousePositions);
                socket.off('mouseClick', onMouseClick);
            };
        } catch (error) {
            setConnected(false);
        }
    }, []);

    useEffect(() => {
        if (isConnected && location && location.lat && location.lon) {
            if (visibility) {
                const data = {
                    city: location.address.city,
                    lat: location.lat,
                    lon: location.lon,
                };
                socket.emit('userAdd', data);
            } else {
                socket.emit('userRemove');
            }
        }
    }, [location, isConnected, visibility]);

    useEffect(() => {
        if (!isConnected || !visibility) return;

        const handleMouseMove = e => {
            const data = { x: e.clientX, y: e.clientY };
            socket.emit('mouseMove', data);
        };

        const debouncedHandleMouseClick = _.debounce(e => {
            const data = { x: e.clientX, y: e.clientY };
            socket.emit('mouseClick', data);
        }, 150);

        window.addEventListener('click', debouncedHandleMouseClick);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('click', debouncedHandleMouseClick);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isConnected, visibility]);

    const memoMousesPositions = React.useMemo(() => {
        if (!visibility) return null;
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
    }, [visibility, usersMousePositions]);

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
