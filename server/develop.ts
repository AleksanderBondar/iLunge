import express from 'express';
import Router from 'express-promise-router';
import { createServer } from 'vite';
import viteConfig from '../vite.config.js';
import { API } from './api/index.js';
import { ROUTES } from './routes/index.js';

const router = Router({ strict: true });

const vite = await createServer({
    configFile: false,
    server: { middlewareMode: true },
    ...viteConfig,
});

ROUTES(router);
API(router);

router.use(vite.middlewares);
router.use('*', (_, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const app = express();
app.use(router);
app.listen(3000, () => {
    console.log(`Listening on port http://localhost:3000...`);
});
