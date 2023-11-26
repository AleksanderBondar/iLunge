import { Router } from 'express';
import fs from 'fs';
import { ViteDevServer } from 'vite';

const readPagesDirectory = async () => {
    const pages = await fs.promises.readdir('./client/pages');
    return pages.map(page => page.split('.')[0]);
};
export const ROUTES = async (router: Router, vite?: ViteDevServer) => {
    const pages = await readPagesDirectory();
    pages.forEach(_page => {
        const page = _page === 'index' ? '' : _page;
        router.get(`/${page}`, async (req, res, _) => {
            let html = fs.readFileSync('./client/index.html', 'utf-8');
            if (vite) html = await vite.transformIndexHtml(req.url, html);
            res.send(html);
        });
    });
};
