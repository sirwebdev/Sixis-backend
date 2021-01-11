import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPostsRespository from '../repositories/IPostsRepository';

interface IRequest {
    post_id: string;
}

@injectable()
export default class DeletePostService {
    constructor(
        @inject('PostsRepository')
        private postRepository: IPostsRespository,
    ) {}

    async execute({ post_id }: IRequest): Promise<void> {
        const post = await this.postRepository.findById(post_id);

        if (!post) throw new AppError('Post does not exists', 404);

        await this.postRepository.deletePost(post_id);
    }
}
