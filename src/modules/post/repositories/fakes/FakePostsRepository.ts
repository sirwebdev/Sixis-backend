import { ObjectID } from 'mongodb';
import { v4 } from 'uuid';

import IPostsRespository from '@modules/post/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/post/dtos/ICreatePostDTO';
import Post from '../../infra/typeorm/schemas/Post';

export default class FakePostsRepository implements IPostsRespository {
    private posts: Post[] = [];

    async create({ content, title }: ICreatePostDTO): Promise<Post> {
        const post = new Post();

        Object.assign(post, {
            id: new ObjectID(),
            post_id: v4(),
            content,
            title,
        });

        this.posts.push(post);

        return post;
    }

    async findAllPosts(): Promise<Post[]> {
        return this.posts;
    }

    async findById(post_id: string): Promise<Post | undefined> {
        const post = this.posts.find(post => post.post_id === post_id);

        return post;
    }

    async save(post: Post): Promise<Post> {
        const oldPostIndex = this.posts.findIndex(
            oldPost => oldPost.id === post.id,
        );

        this.posts[oldPostIndex] = post;

        return post;
    }

    async deletePost(post_id: string): Promise<void> {
        this.posts = this.posts.filter(post => post.post_id !== post_id);
    }
}
