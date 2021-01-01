import AppError from '@shared/errors/AppError';

import CreatePostService from '@modules/post/services/CreatePostService';
import FakeValidationProvider from '../providers/ValidationProvider/fakes/FakeValidationProvider';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

let createPost: CreatePostService;
let fakeValidationProvider: FakeValidationProvider;
let fakePostRepository: FakePostsRepository;

describe('CreatePostService', () => {
    beforeEach(() => {
        fakePostRepository = new FakePostsRepository();
        fakeValidationProvider = new FakeValidationProvider();
        createPost = new CreatePostService(
            fakePostRepository,
            fakeValidationProvider,
        );
    });

    it('should be able to create a new post', async () => {
        const post = await createPost.execute({
            title: 'teste',
            content: 'content test',
        });

        expect(post).toHaveProperty('id');
    });

    it('should not be able to create a new post withou empty fields', async () => {
        expect(
            createPost.execute({
                title: '',
                content: '',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
