import type { Request, Response } from 'express';
import { APICache, readFromCache } from '../utils/cache.js';

export const getQualitiesFromCache = async (_req: Request, res: Response) => {
    const qualities = await readFromCache<APICache['quality']>('quality');
    if (!qualities) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }
    res.send(qualities.qualities || {});
};
