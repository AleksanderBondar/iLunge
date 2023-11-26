import { LocateFixed } from 'lucide-react';
import React from 'react';
import { useAppStore } from '../stores';
import { cx, requestGeolocation } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

export const GeoLocalizationButton = () => {
    const { geoLocation } = useAppStore();

    return (
        <button onClick={requestGeolocation} className="flex items-center justify-center">
            <AnimatePresence>
                {geoLocation ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cx('text-green-500')}
                    >
                        <LocateFixed />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cx('text-red-500')}
                    >
                        <LocateFixed />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
