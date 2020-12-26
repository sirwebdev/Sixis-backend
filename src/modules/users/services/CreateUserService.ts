import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import IValidationProvider from '../providers/ValidationProvider/models/IValidationProvider';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('ValidationProvider')
        private ValidationProvider: IValidationProvider,
    ) {}

    async execute(data: ICreateUserDTO): Promise<User> {
        await this.ValidationProvider.validate(data);

        const { email } = data;

        const existentUser = await this.usersRepository.findByEmail(email);

        if (existentUser) throw new AppError('E-mail already exist');

        const user = await this.usersRepository.create(data);

        return user;
    }
}

export default CreateUserService;
