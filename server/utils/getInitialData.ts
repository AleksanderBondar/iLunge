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

const resolvers = {
    '/': getInitialDataForApp,
    '/about': getInitialDataForAbout,
    '/iframe': getInitialDataForIFrame,
};

export const getInitialData = async (req: Request, page: '/' | '/about' | '/iframe') => {
    const language = parser.pick(['en', 'pl'], req.headers['accept-language'] || 'en');
    const iframe = req.headers['user-agent']?.includes('iframe') || false;
    const context = { iframe, language };
    const props = await resolvers[page]();
    const data = { context, props };
    return data;
};
