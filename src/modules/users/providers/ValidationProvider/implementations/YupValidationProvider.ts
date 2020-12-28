import * as Yup from 'yup';

import AppError from '@shared/errors/AppError';

import ValidationYupErrors from '@shared/errors/ValidationYupErrors';

import IValidationProvider from '../models/IValidationProvider';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class YupValidationProvider implements IValidationProvider {
    async validate(data: ICreateUserDTO): Promise<void | AppError> {
        try {
            const validationShema = Yup.object().shape({
                email: Yup.string().required('E-mail is required'),
                type: Yup.string(),
            });

            await validationShema.validate(data, { abortEarly: false });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = ValidationYupErrors(error);

                throw new AppError(errors);
            }
        }
    }
}
