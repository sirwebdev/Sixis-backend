import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Post from '../infra/typeorm/schemas/Post';
import IPostsRespository from '../repositories/IPostsRepository';

interface IRequest {
    post_id: string;
    title?: string;
    content?: string;
}

@injectable()
export default class UpdatePostService {
    constructor(
        @inject('PostsRepository')
        private postRepository: IPostsRespository,
    ) {}

    async execute({ post_id, content, title }: IRequest): Promise<Post> {
        const foundPost = await this.postRepository.findById(post_id);

        if (!foundPost) throw new AppError('Post does not exists');

        foundPost.title = title || foundPost.title;
        foundPost.content = content || foundPost.content;

        const updatedPost = await this.postRepository.save(foundPost);

        return updatedPost;
    }
}
