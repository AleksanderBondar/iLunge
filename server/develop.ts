import express from 'express';
import Router from 'express-promise-router';
import { createServer } from 'vite';
import fs from 'fs';
import viteConfig from '../vite.config.js';
import { API } from './api/index.js';
import { IO } from './api/io.js';
import { getInitialData } from './utils/getInitialData.js';
const router = Router({ strict: true });

const vite = await createServer({
    configFile: false,
    server: { middlewareMode: true },
    ...viteConfig,
});

API(router);

const AB_PREFIX = '__test_';

const doABTesting = (req: express.Request) => {
    const params = req.query;
    const abParams = Object.keys(params).filter(key => key.startsWith(AB_PREFIX));
    if (!abParams.length) return;
    const abValues = abParams.reduce((acc, key) => {
        const value = params[key];
        const feature = key.replace(AB_PREFIX, '');
        acc[feature as string] = value as string;
        return acc;
    }, {} as Record<string, string>);

    return abValues;
};

//?__test_feature=variant&__test_feature2=variant2

router.get(`/`, async (req, res) => {
    const AB_Values = doABTesting(req);
    console.log(AB_Values);

    let html = fs.readFileSync('./client/index.html', 'utf-8');
    if (vite) html = await vite.transformIndexHtml(req.url, html);
    const data = await getInitialData(req, '/');
    html = html.replace(
        '</body>',
        `<script type="module">window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script></body>`,
    );
    res.send(html);
});
router.get(`/about`, async (req, res, _) => {
    let html = fs.readFileSync('./client/about.html', 'utf-8');
    if (vite) html = await vite.transformIndexHtml(req.url, html);
    const data = await getInitialData(req, '/about');
    html = html.replace(
        '</body>',
        `<script type="module">window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script></body>`,
    );
    res.send(html);
});
router.get(`/iframe`, async (req, res, _) => {
    let html = fs.readFileSync('./client/iframe.html', 'utf-8');
    if (vite) html = await vite.transformIndexHtml(req.url, html);
    const data = await getInitialData(req, '/iframe');
    html = html.replace(
        '</body>',
        `<script type="module">window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script></body>`,
    );
    res.send(html);
});

router.use(vite.middlewares);
router.use('*', (_, res) => {
    res.status(404).send({ message: 'Not Found' });
});
const app = express();
app.use(router);

const server = app.listen(3000, () => {
    console.log(`Listening on port http://localhost:3000...`);
});

IO(server);
