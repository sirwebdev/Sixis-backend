import CreatePostService from '@modules/post/services/CreatePostService';
import ListPostsService from '@modules/post/services/ListPostsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PostController {
    async index(_: Request, response: Response) {
        const listPosts = container.resolve(ListPostsService);

        const posts = await listPosts.execute();

        return response.json(posts);
    }

    async create(request: Request, response: Response) {
        const { title, content } = request.body;

        const createPost = container.resolve(CreatePostService);

        const post = await createPost.execute({ title, content });

        response.json(post);
    }
}
