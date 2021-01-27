import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IPostsRespository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/schemas/Post';

interface IRequest {
    post_id: string;
    filename: string;
}

@injectable()
export default class CreateBannerService {
    constructor(
        @inject('PostsRepository')
        private postsRepository: IPostsRespository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async execute({ post_id, filename }: IRequest): Promise<Post> {
        const post = await this.postsRepository.findById(post_id);

        if (!filename) throw new AppError('File is required');

        if (!post) throw new AppError('Post does not exists', 404);

        const banner = await this.storageProvider.saveFile(filename);

        post.banner = banner;

        const updatedPost = await this.postsRepository.save(post);

        return updatedPost;
    }
}
