import type { Router, Request, Response } from 'express';
import { getStations, getQualityByStationID, getQualitiesFromCache } from '../handlers/index.js';

const checkHealth = async (_: Request, res: Response) => {
    res.send({ message: 'OK!' });
};

export const API = (router: Router) => {
    router.get('/api', checkHealth);
    router.get('/api/stations', getStations);
    router.get('/api/quality/:id', getQualityByStationID);
    router.get('/api/qualities', getQualitiesFromCache);
};
