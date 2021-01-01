import CreatePostService from '@modules/post/services/CreatePostService';
import CreateBannerService from '@modules/post/services/CreateBannerService';
import DeleteBannerService from '@modules/post/services/DeleteBannerService';

import FakeValidationProvider from '../providers/ValidationProvider/fakes/FakeValidationProvider';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeStorageProvider from '@shared/providers/StoragedProvider/fakes/FakeStorageProvide';
import AppError from '@shared/errors/AppError';

let createPost: CreatePostService;
let createBanner: CreateBannerService;
let fakeValidationProvider: FakeValidationProvider;
let fakePostRepository: FakePostsRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteBanner: DeleteBannerService;

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
        deleteBanner = new DeleteBannerService(
            fakePostRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to delete an existent post banner', async () => {
        const { post_id } = await createPost.execute({
            title: 'teste',
            content: 'content test',
        });

        const updatedPost = await createBanner.execute({
            post_id,
            filename: 'file',
        });

        expect(
            await deleteBanner.execute({
                filename: updatedPost.banner,
                post_id,
            }),
        ).resolves;
    });

    it('should not be able to delete a post banner if post does not exists', async () => {
        expect(
            deleteBanner.execute({
                filename: 'unexistent_file',
                post_id: 'kajsdnfkajsdnf',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
