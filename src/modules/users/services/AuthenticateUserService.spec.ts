import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUserRepository;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            email: 'johndoe@example.com',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate without email field', async () => {
        await expect(
            authenticateUser.execute({
                email: '',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
