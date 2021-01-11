import AppError from '@shared/errors/AppError';

import CreatePostService from '@modules/post/services/CreatePostService';
import DeletePostService from '@modules/post/services/DeletePostService';
import FakeValidationProvider from '../providers/ValidationProvider/fakes/FakeValidationProvider';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
// import ListPostsService from './ListPostsService';

let createPost: CreatePostService;
let deletePost: DeletePostService;
// let listPosts: ListPostsService;
let fakeValidationProvider: FakeValidationProvider;
let fakePostRepository: FakePostsRepository;

describe('DeletePostService', () => {
    beforeEach(() => {
        fakePostRepository = new FakePostsRepository();
        fakeValidationProvider = new FakeValidationProvider();
        createPost = new CreatePostService(
            fakePostRepository,
            fakeValidationProvider,
        );
        deletePost = new DeletePostService(fakePostRepository);
        // listPosts = new ListPostsService(fakePostRepository);
    });

    it('should be able to delete a post', async () => {
        const { post_id } = await createPost.execute({
            title: 'teste',
            content: 'content test',
        });

        await expect(deletePost.execute({ post_id })).resolves.toBeUndefined();
    });

    it('should not be able to delete an unexistent post', async () => {
        expect(
            deletePost.execute({
                post_id: 'non-existent-post',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
