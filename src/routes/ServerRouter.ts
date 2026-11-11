import { Router } from "express";

const serverRouter = Router();

serverRouter.get('/', (_req, res) => {
  res.status(200).json({ message: '¡Bienvenido! :) Manos a la obra.' });
});

serverRouter.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong' });
});

export default serverRouter;
