import type { Request, Response } from 'express';
import type { Station } from '../../types/backend';
import type { Stations } from '../../types/front';

import { readFromCache, APICache, writeToCache } from '../utils/cache.js';
import { fetcher } from '../utils/fetcher.js';
import { log } from '../utils/logger.js';
import { envs } from '../utils/envs.js';
const { CACHE_TIME, API_URL } = envs;

export const getStations = async (_: Request, res: Response) => {
    const stations = await readFromCache<APICache['stations']>('stations');
    if (stations && stations?.timestamp + CACHE_TIME > Date.now()) {
        log('Serving stations from cache', 'cache');
        res.send(stations.stations);
        return;
    } else {
        const stations = await fetcher<Station[]>(`${API_URL}/station/findAll`);
        if (!stations) {
            res.status(404).send({ message: 'Not Found' });
            return;
        }
        log('Fetched stations from API', 'fetch');

        const reduced = stations.reduce((acc, station) => {
            if (!acc[station.city.name]) {
                acc[station.city.name] = [];
            }
            acc[station.city.name].push(station);
            return acc;
        }, {} as Stations);

        const saved = await writeToCache('stations', {
            timestamp: Date.now(),
            stations: reduced,
        });
        if (!saved) {
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }
        res.send(reduced);
        return;
    }
};
