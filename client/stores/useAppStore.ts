import { create } from 'zustand';
import { LocationData, GeoLocation, Stations } from '../../types/front';
import { Station } from '../../types/backend';
import { checkWhereLatLong, doGeoLocation, requestGeolocation } from '../utils';
import { AirQuality } from '../../types/front';
type AppStore = {
    loading: boolean;
    qualityLoading: boolean;
    stations: Stations;
    mode: string;
    selectedStation: Station | null;
    location: LocationData | null;
    geoLocation: GeoLocation | null;
    searchValue: string | null;
    searchResults: Stations;

    airQualities: Record<string, AirQuality> | null;
    airQuality: AirQuality | null;

    initState: () => Promise<void>;
    setMode: (mode: string) => void;
    selectStation: (id: number | null) => void;
    setSearchValue: (value: string | null) => void;
    initSearch: () => void;
    setSearch: (search: string) => void;
    checkMode: () => void;
    allowRotation: boolean;
    toggleRotation: () => void;
};

export const useAppStore = create<AppStore>()((set, get) => {
    const initState = async () => {
        if (
            localStorage.theme === 'dark' ||
            (window.matchMedia('(prefers-color-scheme:dark)').matches && !('theme' in localStorage))
        ) {
            set({ mode: 'dark', loading: true });
            document.documentElement.classList.add('dark');
        } else {
            set({ mode: 'light', loading: true });
            document.documentElement.classList.remove('dark');
        }
        try {
            const response = await fetch('/api/stations');
            const data = await response.json();
            set({ stations: data, loading: false });
        } catch (e) {
            console.error(e);
            set(state => ({ ...state, loading: false }));
        }

        try {
            const geoLocation = await requestGeolocation();
            if (!geoLocation) return;
            const location = await checkWhereLatLong(geoLocation.latitude, geoLocation.longitude);
            if (location) setSearchValue(location.address.city);
            set({ geoLocation: geoLocation, location });
        } catch (e) {
            console.error(e);
            set({ geoLocation: null, location: null });
        }

        try {
            const res = await fetch(`/api/qualities`);
            const airQualities = (await res.json()) as Record<string, AirQuality>;
            set({ airQualities });
        } catch (e) {
            console.error(e);
            set({ airQualities: null });
        }
    };

    const setSearchValue = (value: string | null) => {
        setSearch(value || '');
        set({ searchValue: value });
    };

    const setSearch = (search: string) => {
        const stations = get().stations;
        const searchResults = Object.entries(stations).reduce((acc, [key, value]) => {
            if (key.toLowerCase().includes(search.toLowerCase())) {
                acc[key] = value;
            }
            return acc;
        }, {} as Stations);
        set({ searchResults });
    };

    const selectStation = async (id: number | null) => {
        if (!id) {
            set({ selectedStation: null, airQuality: null });
            return;
        }
        const stations = get().stations;
        const station =
            Object.values(stations)
                .find(stations => stations.find(s => s.id === id))
                ?.find(s => s.id === id) || null;
        set({ selectedStation: station, qualityLoading: true });

        try {
            let res = await fetch(`/api/quality/${id}`);
            const airQuality = (await res.json()) as AirQuality;
            set({ airQuality });
            const { airQualities } = get();
            if (airQualities && !airQualities[id]) {
                res = await fetch(`/api/qualities`);
                const airQualities = (await res.json()) as Record<string, AirQuality>;
                set({ airQualities });
            }
        } catch {
        } finally {
            set({ qualityLoading: false });
        }
    };

    const initSearch = () => {
        const stations = get().stations;
        const searchResults = Object.entries(stations).reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as Stations);
        set({ searchResults: Object.keys(get().searchResults).length ? get().searchResults : searchResults });
    };
    const setMode = (mode: string) => {
        switch (mode) {
            case 'dark': {
                localStorage.theme = 'dark';
                document.documentElement.classList.add('dark');
                break;
            }
            case 'light': {
                localStorage.theme = 'light';
                document.documentElement.classList.remove('dark');
                break;
            }
            default: {
                window.matchMedia('(prefers-color-scheme:dark)').matches
                    ? document.documentElement.classList.add('dark')
                    : document.documentElement.classList.remove('dark');
                localStorage.removeItem('theme');
                break;
            }
        }
        set(state => ({ ...state, mode }));
    };
    const checkMode = () => {
        if (
            localStorage.theme === 'dark' ||
            (window.matchMedia('(prefers-color-scheme:dark)').matches && !('theme' in localStorage))
        ) {
            set({ mode: 'dark', loading: true });
            document.documentElement.classList.add('dark');
        } else {
            set({ mode: 'light', loading: true });
            document.documentElement.classList.remove('dark');
        }
    };
    const toggleRotation = () => {
        const { allowRotation } = get();
        set({ allowRotation: !allowRotation });
    };

    return {
        loading: true,
        stations: {},
        mode: '',
        selectedStation: null,
        location: null,
        geoLocation: null,
        searchValue: null,
        searchResults: {},
        airQuality: null,
        qualityLoading: false,
        airQualities: null,
        initState,
        setMode,
        selectStation,
        setSearchValue,
        initSearch,
        setSearch,
        checkMode,
        allowRotation: false,
        toggleRotation,
    };
});
