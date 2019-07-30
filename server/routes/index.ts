import {Router} from 'express';
import apiRouter from 'server/routes/api';

export const mainRouter = Router();
mainRouter.use('/api', apiRouter);
