import CreateUserService from './CreateUserService';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeValidationProvider from '@modules/users/providers/ValidationProvider/fakes/FakeValidationProvider';

import AppError from '@shared/errors/AppError';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeValidationProvider: FakeValidationProvider;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeValidationProvider = new FakeValidationProvider();
        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeValidationProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUserService.execute({
            email: 'johndoe@example.com',
        });

        expect(user).toHaveProperty('id');
        expect(user.type).toBe('user');
    });

    it('should not be able to create a new user within an existent email', async () => {
        await createUserService.execute({
            email: 'johndoe@example.com',
        });

        expect(
            createUserService.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new user with non-existent type', async () => {
        const type: any = 'aksdjn';

        expect(
            createUserService.execute({
                email: 'johndoe@example.com',
                type,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
