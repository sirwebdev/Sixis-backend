import CreatePostService from '@modules/post/services/CreatePostService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PostController {
    async create(request: Request, response: Response) {
        const { title, content } = request.body;

        const createPost = container.resolve(CreatePostService);

        const post = await createPost.execute({ title, content });

        response.json(post);
    }
}
