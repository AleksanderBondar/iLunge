import React, { useEffect } from 'react';
import { useAppStore, useSocketStore } from '../stores/';
import { Search } from '../components/Search';
import { LungCanvas } from '../components/lungCanvas';
import { AirQualityInfo } from '../components/AirQualityInfo';
import { Map } from '../components/map';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { MapButton } from '../components/MapButton';
import { io } from 'socket.io-client';

const socket = io();

function Home() {
    const { initState, location } = useAppStore();
    const { setUsers, setConnected, isConnected } = useSocketStore();
    useEffect(() => {
        initState();

        try {
            const onConnect = () => setConnected(true);
            const onDisconnect = () => setConnected(false);
            const onUsers = users => setUsers(users);

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('users', onUsers);
            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
                socket.off('users', onUsers);
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

    return (
        <div className="background-light900_dark200  relative h-screen overflow-hidden">
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
