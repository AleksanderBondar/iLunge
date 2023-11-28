import { Request } from 'express';
import { readFromCache } from './cache.js';
import parser from 'accept-language-parser';

const getInitialDataForApp = async () => {
    const stations = (await readFromCache('stations')) || {};
    const airQualities = (await readFromCache('quality')) || {};
    return { stations, airQualities };
};
const getInitialDataForAbout = async () => {
    return {};
};
const getInitialDataForIFrame = async () => {
    const stations = (await readFromCache('stations')) || {};
    return { stations };
};

export const getInitialData = async (req: Request, page: '/' | '/about' | '/iframe') => {
    const language = parser.pick(['en', 'pl'], req.headers['accept-language'] || 'en');
    const iframe = req.headers['user-agent']?.includes('iframe') || false;
    const context = { iframe, language };
    if (page === '/') {
        const props = await getInitialDataForApp();
        const data = { context, props };
        return data;
    }
    if (page === '/about') {
        const props = await getInitialDataForAbout();
        const data = { context, props };
        return data;
    }
    if (page === '/iframe') {
        const props = await getInitialDataForIFrame();
        const data = { context, props };
        return data;
    }
};
