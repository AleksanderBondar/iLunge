import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils';
import { useMapStore } from '../../stores';
import { MapHeader } from './MapHeader';
import { AnimatePresence, motion } from 'framer-motion';
import { MapView } from './MapView';
import { Map as MapType } from 'leaflet';

export const Map = () => {
    const { isOpen, close } = useMapStore();
    const [map, setMap] = useState<MapType | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            const button = document.getElementById('container');
            if (button && !button.contains(e.target as Node) && !ref.current?.contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    ref={ref}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={cx(
                        'fixed bottom-0 right-0',
                        'border-light700_dark400 h-screen w-screen sm:w-[40rem] sm:border-l-[2px] sm:shadow-2xl',
                    )}
                >
                    <div className="relative h-full w-full flex-col">
                        {map ? <MapHeader map={map} /> : null}
                        <MapView setMap={setMap} />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
