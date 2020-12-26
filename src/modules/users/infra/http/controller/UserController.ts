import { Request, Response } from 'express';

import YupValidationProvider from '@modules/users/providers/ValidationProvider/implementations/YupValidationProvider';

export default class UserController {
    async create(request: Request, response: Response) {
        const { email } = request.body;

        const yupValidationProvider = new YupValidationProvider();

        await yupValidationProvider.validate({ email });

        return response.json({ ok: true });
    }
}
