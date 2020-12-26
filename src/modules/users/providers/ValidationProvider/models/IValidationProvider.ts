import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';

export default interface IValidationProvider {
    validate(data: ICreateUserDTO): Promise<void | AppError>;
}
