import 'dotenv/config';

export const envs = {
    CACHE_TIME: process.env.CACHE_TIME ? parseInt(process.env.CACHE_TIME) : 0,
    API_URL: process.env.API_URL ? process.env.API_URL : '',
    LAST_UPDATE_QUALITY: process.env.LAST_UPDATE_QUALITY ? parseInt(process.env.LAST_UPDATE_QUALITY) : 0,
    OPEN_AI: process.env.OPEN_AI ? process.env.OPEN_AI : '',
};
