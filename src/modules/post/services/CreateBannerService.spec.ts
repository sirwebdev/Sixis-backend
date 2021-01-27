import AppError from '@shared/errors/AppError';

import CreatePostService from '@modules/post/services/CreatePostService';
import CreateBannerService from '@modules/post/services/CreateBannerService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvide';
import FakeValidationProvider from '../providers/ValidationProvider/fakes/FakeValidationProvider';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

let createPost: CreatePostService;
let createBanner: CreateBannerService;
let fakeValidationProvider: FakeValidationProvider;
let fakePostRepository: FakePostsRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('CreateBannerService', () => {
    beforeEach(() => {
        fakePostRepository = new FakePostsRepository();
        fakeValidationProvider = new FakeValidationProvider();
        fakeStorageProvider = new FakeStorageProvider();
        createPost = new CreatePostService(
            fakePostRepository,
            fakeValidationProvider,
        );
        createBanner = new CreateBannerService(
            fakePostRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to update an existent post banner', async () => {
        const { post_id } = await createPost.execute({
            title: 'teste',
            content: 'content test',
        });

        const updatedPost = await createBanner.execute({
            post_id,
            filename: 'file',
        });

        expect(updatedPost).toHaveProperty('id');
        expect(!!updatedPost.banner).toBe(true);
    });

    it('should not be able to update an unexistent post banner', async () => {
        expect(
            createBanner.execute({
                post_id: 'aksjdfn',
                filename: 'file',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a post banner with empty banner file', async () => {
        // eslint-disable-next-line
        const filename: any = undefined;

        expect(
            createBanner.execute({
                post_id: 'aksjdfn',
                filename,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
