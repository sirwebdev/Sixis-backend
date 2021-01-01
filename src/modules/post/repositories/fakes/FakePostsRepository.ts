import { ObjectID } from 'mongodb';

import Post from '../../infra/typeorm/schemas/Post';

import IPostsRespository from '@modules/post/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';

export default class FakePostsRepository implements IPostsRespository {
    private posts: Post[] = [];

    async create({ content, title }: ICreatePostDTO): Promise<Post> {
        const post = new Post();

        Object.assign(post, { id: new ObjectID(), content, title });

        this.posts.push(post);

        return post;
    }

    async findAllPosts(): Promise<Post[]> {
        return this.posts;
    }
}
