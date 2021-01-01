import { getMongoRepository, MongoRepository } from 'typeorm';

import Post from '../schemas/Post';

import IPostsRespository from '@modules/post/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';

export default class PostsRepository implements IPostsRespository {
    private ormRepository: MongoRepository<Post>;

    constructor() {
        this.ormRepository = getMongoRepository(Post, 'mongo');
    }

    async create({ content, title }: ICreatePostDTO): Promise<Post> {
        const post = this.ormRepository.create({
            content,
            title,
        });

        await this.ormRepository.save(post);

        return post;
    }

    async findAllPosts(): Promise<Post[]> {
        const posts = await this.ormRepository.find();

        return posts;
    }
}
