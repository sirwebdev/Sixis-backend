import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import PostController from '../controller/PostController';
import PostBannerController from '../controller/PostBannerController';

import ensureAdminType from '../middlewares/ensureAdminType';

import uploadConfig from '@config/upload';

const postRoutes = Router();

const postController = new PostController();
const postBannerController = new PostBannerController();

const upload = multer(uploadConfig.multer);

postRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdminType,
    postController.create,
);

postRoutes.patch(
    '/:post_id',
    upload.single('banner'),
    postBannerController.create,
);

export default postRoutes;
