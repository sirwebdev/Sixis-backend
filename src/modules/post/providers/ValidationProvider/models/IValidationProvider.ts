import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import AppError from '@shared/errors/AppError';

export default interface IValidationProvider {
    validate(data: ICreatePostDTO): Promise<void | AppError>;
}
