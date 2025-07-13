import { Router, Request, Response } from 'express';

const androidRouter = Router();

androidRouter.get('/venues', (req: Request, res: Response) => {
  console.log(`[${new Date().toISOString()}] GET /api/android/venues called`);

  res.sendStatus(204);
});

export default androidRouter;