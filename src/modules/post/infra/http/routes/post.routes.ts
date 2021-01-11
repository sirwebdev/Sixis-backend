import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import PostController from '../controller/PostController';
import PostBannerController from '../controller/PostBannerController';

import ensureAdminType from '../middlewares/ensureAdminType';

const postRoutes = Router();

const postController = new PostController();
const postBannerController = new PostBannerController();

const upload = multer(uploadConfig.multer);

postRoutes.get('/', postController.index);

postRoutes.get('/:post_id', postController.show);

postRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdminType,
    postController.create,
);

postRoutes.patch(
    '/:post_id',
    upload.single('banner'),
    ensureAuthenticated,
    ensureAdminType,
    postBannerController.create,
);

export default postRoutes;
