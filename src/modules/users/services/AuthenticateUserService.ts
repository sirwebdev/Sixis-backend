import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        if (!email) throw new AppError('E-mail is required');

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found.', 404);
        }

        const correctlyPassword = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!correctlyPassword) throw new AppError('Invalid credentials', 401);

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: JSON.stringify({ id: user.id, type: user.type }),
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
