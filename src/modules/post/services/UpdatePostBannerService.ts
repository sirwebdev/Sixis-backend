import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/schemas/Post';

interface IRequest {
    post_id: string;
    bannerFilename: string;
}

@injectable()
class UpdatePostBannerService {
    constructor(
        @inject('PostsRepository')
        private postsRepository: IPostsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ post_id, bannerFilename }: IRequest): Promise<Post> {
        const post = await this.postsRepository.findById(post_id);

        if (!post) {
            throw new AppError(
                'Only authenticated posts can change banner.',
                401,
            );
        }

        if (post.banner) {
            await this.storageProvider.deleteFile(post.banner);
        }

        const filename = await this.storageProvider.saveFile(bannerFilename);

        post.banner = filename;

        await this.postsRepository.save(post);

        return post;
    }
}

export default UpdatePostBannerService;
