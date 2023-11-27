import express from 'express';
import Router from 'express-promise-router';
import { API } from './api/index.js';
import { IO } from './api/io.js';
import { getInitialData } from './utils/getInitialData.js';
import fs from 'fs';

const router = Router({ strict: true });

API(router);

router.get(`/`, async (req, res, _) => {
    let html = fs.readFileSync('./dist/index.html', 'utf-8');
    const data = getInitialData(req, '/');
    html = html.replace(
        '</body>',
        `<script type="module">window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script> </body>`,
    );
    res.send(html);
});
router.get(`/about`, async (req, res, _) => {
    let html = fs.readFileSync('./dist/about.html', 'utf-8');
    const data = getInitialData(req, '/about');
    html = html.replace(
        '</body>',
        `<script type="module">window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script> </body>`,
    );
    res.send(html);
});
router.get(`/iframe`, async (req, res, _) => {
    let html = fs.readFileSync('./dist/iframe.html', 'utf-8');
    const data = getInitialData(req, '/iframe');
    html = html.replace(
        '</body>',
        `<script type="module">window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script> </body>`,
    );
    res.send(html);
});
router.use('*', (_, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const app = express();
app.use(express.static('dist', { index: false, maxAge: 1800000 }));

app.use(router);
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:3000...`);
});

IO(server);
