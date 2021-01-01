import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';

import postRoutes from '@modules/post/infra/http/routes/post.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);

routes.use('/users', userRouter);

routes.use('/posts', postRoutes);

export default routes;
