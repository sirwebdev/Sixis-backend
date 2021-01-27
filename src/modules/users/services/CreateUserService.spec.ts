import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeValidationProvider from '@modules/users/providers/ValidationProvider/fakes/FakeValidationProvider';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeValidationProvider: FakeValidationProvider;
let fakeHashProvider: FakeHashProvider;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeValidationProvider = new FakeValidationProvider();
        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeValidationProvider,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUserService.execute({
            email: 'johndoe@example.com',
            password: 'password',
        });

        expect(user).toHaveProperty('id');
        expect(user.type).toBe('user');
    });

    it('should not be able to create a new user within an existent email', async () => {
        await createUserService.execute({
            email: 'johndoe@example.com',
            password: 'password',
        });

        expect(
            createUserService.execute({
                email: 'johndoe@example.com',
                password: 'password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new user with non-existent type', async () => {
        // eslint-disable-next-line
        const type: any = 'aksdjn';

        expect(
            createUserService.execute({
                email: 'johndoe@example.com',
                password: 'password',
                type,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
