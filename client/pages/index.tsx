import React, { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Search } from '../components/Search';
import { Canvas } from '../components/canvas';
import { AirQualityInfo } from '../components/AirQualityInfo';
import { Map } from '../components/map';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { MapButton } from '../components/MapButton';

function Home() {
    const { initState, location } = useAppStore();
    useEffect(() => {
        initState();
    }, []);

    return (
        <div className="background-light900_dark200  relative h-screen overflow-hidden">
            <Canvas />
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
