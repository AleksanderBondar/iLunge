import fs from 'fs';
import type { AirQuality, Station } from '../../types/backend';

const cache = {
    stations: './server/cache/stations.json',
    quality: './server/cache/quality.json',
};

export type APICache = {
    stations: {
        timestamp: number;
        stations: Record<string, Station[]>;
    };
    quality: {
        timestamp: number;
        qualities: Record<string, AirQuality>;
    };
};

export const readFromCache = async <T>(where: keyof typeof cache): Promise<T | null> => {
    try {
        const path = cache[where as keyof typeof cache];
        const data = fs.readFileSync(path, 'utf-8');
        const parsed = JSON.parse(data);
        return parsed;
    } catch {
        return null;
    }
};

export const writeToCache = async <T>(where: keyof typeof cache, data: T): Promise<boolean> => {
    try {
        const path = cache[where];
        fs.mkdirSync(path.substring(0, path.lastIndexOf('/')), { recursive: true });
        const parsed = JSON.stringify(data, null, 4);
        fs.writeFileSync(path, parsed);
        return true;
    } catch {
        return false;
    }
};
