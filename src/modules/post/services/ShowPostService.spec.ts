import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import CreatePostService from './CreatePostService';
import ShowPostService from './ShowPostService';
import FakeValidationProvider from '../providers/ValidationProvider/fakes/FakeValidationProvider';
import AppError from '@shared/errors/AppError';
import UpdatePostBannerService from './UpdatePostBannerService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvide';

let fakePostsRepository: FakePostsRepository;
let fakeValidationProvider: FakeValidationProvider;
let fakeStorageProvide: FakeStorageProvider;
let showPost: ShowPostService;
let createPost: CreatePostService;
let updatePostBanner: UpdatePostBannerService;

describe('ShowPostService', () => {
    beforeEach(() => {
        fakePostsRepository = new FakePostsRepository();
        fakeValidationProvider = new FakeValidationProvider();
        fakeStorageProvide = new FakeStorageProvider();
        showPost = new ShowPostService(fakePostsRepository);
        createPost = new CreatePostService(
            fakePostsRepository,
            fakeValidationProvider,
        );
        updatePostBanner = new UpdatePostBannerService(
            fakePostsRepository,
            fakeStorageProvide,
        );
    });

    it('should be able to show an specific post', async () => {
        const { post_id } = await createPost.execute({
            title: 'title 1',
            content: 'content 1',
        });

        const post = await showPost.execute({ post_id });

        expect(post).toHaveProperty('id');
        expect(post.title).toBe('title 1');
        expect(post.content).toBe('content 1');
    });

    it('should not be able to show an unexistent post', async () => {
        expect(
            showPost.execute({ post_id: 'non-existent-post' }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
