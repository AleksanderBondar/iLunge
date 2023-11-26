import React, { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Search } from '../components/Search';
import { Canvas } from '../components/canvas';
import { AirQualityInfo } from '../components/AirQualityInfo';
import { Map } from '../components/map';

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
        </div>
    );
}

export default Home;
