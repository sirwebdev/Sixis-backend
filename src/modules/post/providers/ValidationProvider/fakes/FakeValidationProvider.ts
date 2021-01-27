import AppError from '@shared/errors/AppError';

import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import IValidationProvider from '../models/IValidationProvider';

export default class FakeValidationProvider implements IValidationProvider {
    async validate(data: ICreatePostDTO): Promise<void | AppError> {
        if (!data.title) throw new AppError('Title is required');
        if (!data.content) throw new AppError('Content is required');
    }
}
