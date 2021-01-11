import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import IValidationProvider from '../providers/ValidationProvider/models/IValidationProvider';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('UserValidationProvider')
        private ValidationProvider: IValidationProvider,

        @inject('HashProvider')
        private HashProvider: IHashProvider,
    ) {}

    async execute(data: ICreateUserDTO): Promise<User> {
        await this.ValidationProvider.validate(data);

        const { email, type = 'user', password } = data;

        const existentUser = await this.usersRepository.findByEmail(email);

        if (existentUser) throw new AppError('E-mail already exists');

        if (type !== 'user' && type !== 'admin')
            throw new AppError('Type does not exists');

        const encryptedPassword = await this.HashProvider.generateHash(
            password,
        );

        const user = await this.usersRepository.create({
            ...data,
            password: encryptedPassword,
        });

        return user;
    }
}

export default CreateUserService;
