import express from 'express';
import Router from 'express-promise-router';
import { API } from './api/index.js';
import { ROUTES } from './routes/index.js';

const router = Router({ strict: true });

ROUTES(router);
API(router);

router.use('*', (_, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const app = express();
app.use(express.static('dist'));
app.use(router);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:3000...`);
});
