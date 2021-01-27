import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IValidationProvider from '../models/IValidationProvider';

export default class FakeValidationProvider implements IValidationProvider {
    async validate(data: ICreateUserDTO): Promise<void | AppError> {
        if (!data.email) throw new AppError('E-mail is required');
    }
}
