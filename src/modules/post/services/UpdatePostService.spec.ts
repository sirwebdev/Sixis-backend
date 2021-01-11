import AppError from '@shared/errors/AppError';

import CreatePostService from '@modules/post/services/CreatePostService';
import FakeValidationProvider from '../providers/ValidationProvider/fakes/FakeValidationProvider';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import UpdatePostService from './UpdatePostService';

let createPost: CreatePostService;
let updatePost: UpdatePostService;
let fakeValidationProvider: FakeValidationProvider;
let fakePostRepository: FakePostsRepository;

describe('UpdatePostService', () => {
    beforeEach(() => {
        fakePostRepository = new FakePostsRepository();
        fakeValidationProvider = new FakeValidationProvider();
        createPost = new CreatePostService(
            fakePostRepository,
            fakeValidationProvider,
        );
        updatePost = new UpdatePostService(fakePostRepository);
    });

    it('should be able to update a post title', async () => {
        const { post_id } = await createPost.execute({
            title: 'teste',
            content: 'content test',
        });

        const updatedPost = await updatePost.execute({
            post_id,
            title: 'new title',
        });

        expect(updatedPost).toHaveProperty('id');
        expect(updatedPost.title).toEqual('new title');
    });

    it('should be able to update a post title', async () => {
        const { post_id } = await createPost.execute({
            title: 'teste',
            content: 'content test',
        });

        const updatedPost = await updatePost.execute({
            post_id,
            content: 'new content',
        });

        expect(updatedPost).toHaveProperty('id');
        expect(updatedPost.content).toEqual('new content');
    });

    it('should not be able to update an unexistent post', async () => {
        await expect(
            updatePost.execute({
                post_id: 'non-existent-post',
                title: 'new title',
                content: 'new content',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
