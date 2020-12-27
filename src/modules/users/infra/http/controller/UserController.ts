import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
    async create(request: Request, response: Response) {
        const { email } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ email });

        return response.json(user);
    }
}
