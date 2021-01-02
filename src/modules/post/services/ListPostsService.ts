import { inject, injectable } from 'tsyringe';

import Post from '../infra/typeorm/schemas/Post';

import IPostsRespository from '../repositories/IPostsRepository';

@injectable()
export default class ListPostsService {
    constructor(
        @inject('PostsRepository')
        private postsRepository: IPostsRespository,
    ) {}

    async execute(): Promise<Post[]> {
        const posts = await this.postsRepository.findAllPosts();

        return posts;
    }
}
