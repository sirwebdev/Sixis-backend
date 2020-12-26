import { Router } from 'express';

import UserController from '../controller/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/', userController.create);

export default usersRouter;
