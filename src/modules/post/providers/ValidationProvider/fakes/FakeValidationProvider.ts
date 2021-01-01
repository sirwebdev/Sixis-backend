import AppError from '@shared/errors/AppError';

import IValidationProvider from '../models/IValidationProvider';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';

export default class FakeValidationProvider implements IValidationProvider {
    async validate(data: ICreatePostDTO): Promise<void | AppError> {
        if (!data.title) throw new AppError('Title is required');
        if (!data.content) throw new AppError('Content is required');
    }
}
