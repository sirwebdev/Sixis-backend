import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import Post from '../infra/typeorm/schemas/Post';
import IPostsRespository from '../repositories/IPostsRepository';

import ICreatePostDTO from '../dtos/ICreatePostDTO';
import IValidationProvider from '@modules/post/providers/ValidationProvider/models/IValidationProvider';

@injectable()
export default class CreatePostService {
    constructor(
        @inject('PostsRepository')
        private postsRepository: IPostsRespository,

        @inject('PostValidationProvider')
        private validationProvider: IValidationProvider,
    ) {}

    async execute(data: ICreatePostDTO): Promise<Post> {
        await this.validationProvider.validate(data);

        let post = await this.postsRepository.create(data);

        // @ts-ignore
        delete post.created_at;
        // @ts-ignore
        delete post.updated_at;

        return post;
    }
}
