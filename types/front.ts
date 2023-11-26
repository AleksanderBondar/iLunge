import { Station } from './backend';

export type LineChartData = { name: string; uv: number; pv: number }[];

export type DangerousSubstance = 'pm10' | 'pm25' | 'no2' | 'so2' | 'o3' | 'st';

export type AirQuality = Record<
    DangerousSubstance,
    {
        lastCacheUpdate: string;
        calcDate: string | null;
        indexLevel: { id: number; indexLevelName: string } | null;
        sourceDataDate: string | null;
    }
>;

export type Stations = Record<string, Station[]>;

type Address = {
    road: string;
    suburb: string;
    city: string;
    state: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
};

type BoundingBox = [string, string, string, string];

export type LocationData = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    category: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: Address;
    boundingbox: BoundingBox;
};

export type GeoLocation = {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
    timestamp: number;
};
