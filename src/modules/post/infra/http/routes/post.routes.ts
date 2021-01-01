import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import PostController from '../controller/PostController';
import ensureAdminType from '../middlewares/ensureAdminType';

const postRoutes = Router();

const postController = new PostController();

postRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdminType,
    postController.create,
);

export default postRoutes;
