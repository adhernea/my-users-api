import { Router } from "express";

import path from 'node:path';
import { fileURLToPath } from 'node:url';


const serverRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.resolve(__dirname, '../../public');

serverRouter.get('/', (_req, res) => {
  res.status(200).json({ message: '¡Bienvenido! :) Manos a la obra.' });
});

serverRouter.get('/favicon.ico', (_req, res) => {
  res.sendFile(path.join(publicPath, 'favicon.ico'));
});

serverRouter.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong' });
});

export default serverRouter;
