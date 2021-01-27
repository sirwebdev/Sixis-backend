import * as Yup from 'yup';

import AppError from '@shared/errors/AppError';

import ValidationYupErrors from '@shared/errors/ValidationYupErrors';

import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import IValidationProvider from '../models/IValidationProvider';

export default class YupValidationProvider implements IValidationProvider {
    async validate(data: ICreatePostDTO): Promise<void | AppError> {
        try {
            const validationShema = Yup.object().shape({
                title: Yup.string().required('Title is required'),
                content: Yup.string().required('Content is required'),
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
