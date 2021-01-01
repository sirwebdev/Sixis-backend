import { Router } from 'express';

import UserController from '../controller/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', userController.create);

export default userRouter;
