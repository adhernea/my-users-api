import { Router } from "express";

const serverRouter = Router();

serverRouter.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong' });
});

export default serverRouter;
