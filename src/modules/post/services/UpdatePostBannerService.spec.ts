import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvide';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import UpdatePostBannerService from './UpdatePostBannerService';

let fakePostsRepository: FakePostsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatePostBanner: UpdatePostBannerService;

describe('UpdatePostBanner', () => {
    beforeEach(() => {
        fakePostsRepository = new FakePostsRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updatePostBanner = new UpdatePostBannerService(
            fakePostsRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to create a new post', async () => {
        const post = await fakePostsRepository.create({
            title: 'some title',
            content: 'any content',
        });

        await updatePostBanner.execute({
            post_id: post.post_id,
            bannerFilename: 'banner.jpg',
        });

        expect(post.banner).toBe('banner.jpg');
    });

    it('should not be able to update banner from non existing post', async () => {
        await expect(
            updatePostBanner.execute({
                post_id: 'non-existing-post',
                bannerFilename: 'banner.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old banner when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const post = await fakePostsRepository.create({
            title: 'some title',
            content: 'any content',
        });

        await updatePostBanner.execute({
            post_id: post.post_id,
            bannerFilename: 'banner.jpg',
        });

        await updatePostBanner.execute({
            post_id: post.post_id,
            bannerFilename: 'banner2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('banner.jpg');
        expect(post.banner).toBe('banner2.jpg');
    });
});
