import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/providers/StoragedProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

import IPostsRespository from '../repositories/IPostsRepository';

interface IRequest {
    filename: string;
    post_id: string;
}

@injectable()
export default class DeleteBannerService {
    constructor(
        @inject('PostsRepository')
        private postsRepository: IPostsRespository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async execute({ filename, post_id }: IRequest): Promise<void> {
        const post = await this.postsRepository.findById(post_id);

        if (!post) throw new AppError('Post does not exists', 404);

        await this.storageProvider.deleteFile(filename);

        post.banner = '';

        await this.postsRepository.save(post);
    }
}
