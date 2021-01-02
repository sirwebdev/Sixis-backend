import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Post from '../infra/typeorm/schemas/Post';
import IPostsRespository from '../repositories/IPostsRepository';

interface IRequest {
    post_id: string;
}

@injectable()
export default class ShowPostService {
    constructor(
        @inject('PostsRepository')
        private postsRepository: IPostsRespository,
    ) {}

    async execute({ post_id }: IRequest): Promise<Post> {
        const foundPost = await this.postsRepository.findById(post_id);

        if (!foundPost) throw new AppError('Post does not exists', 404);

        return foundPost;
    }
}
