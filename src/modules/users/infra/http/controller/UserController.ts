import { Request, Response } from 'express';
import { container } from 'tsyringe';

import YupValidationProvider from '@modules/users/providers/ValidationProvider/implementations/YupValidationProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
    async create(request: Request, response: Response) {
        const { email } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = createUser.execute({ email });

        return response.json(user);
    }
}
