import type { Request, Response } from 'express';
import type { AirQuality } from '../../types/backend';

import { readFromCache, APICache, writeToCache } from '../utils/cache.js';
import { fetcher } from '../utils/fetcher.js';
import { log } from '../utils/logger.js';
import { envs } from '../utils/envs.js';
import { convertAirQuality } from '../utils/converters.js';
const { LAST_UPDATE_QUALITY, CACHE_TIME, API_URL } = envs;

export const getQualityByStationID = async (req: Request, res: Response) => {
    const id = req.params.id;
    const qualityFromCache = await readFromCache<APICache['quality']>('quality');

    if (
        qualityFromCache &&
        qualityFromCache.qualities &&
        qualityFromCache.qualities[id] &&
        (qualityFromCache.qualities[id].lastCacheUpdate || 0) + LAST_UPDATE_QUALITY > Date.now() &&
        (qualityFromCache?.timestamp || 0) + CACHE_TIME > Date.now()
    ) {
        log('Serving qualityFromCache from cache', 'cache');
        res.send(qualityFromCache.qualities[id]);
        return;
    } else {
        const quality = await fetcher<AirQuality>(`${API_URL}/aqindex/getIndex/${id}`);
        if (!quality) {
            res.status(404).send({ message: 'Not Found' });
            return;
        }
        log('Fetched quality from API', 'fetch');
        const { id: _, ...rest } = quality;
        const saved = await writeToCache('quality', {
            timestamp: Date.now(),
            qualities: {
                ...qualityFromCache?.qualities,
                [_]: convertAirQuality({ id: _, ...rest, lastCacheUpdate: Date.now() }),
            },
        });
        if (!saved) {
            res.status(500).send({ message: 'Internal Server Error' });
            return;
        }
        res.send(convertAirQuality({ id: _, ...rest, lastCacheUpdate: Date.now() }));
        return;
    }
};
