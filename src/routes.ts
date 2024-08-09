import router from 'express';
import authenticationRouter from './router';

const appRouter = router();

const authPath = '/auth';

appRouter.use(authPath, authenticationRouter);

export default appRouter;