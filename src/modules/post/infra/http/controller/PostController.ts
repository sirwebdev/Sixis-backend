import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/post/services/CreatePostService';
import ListPostsService from '@modules/post/services/ListPostsService';
import ShowPostService from '@modules/post/services/ShowPostService';
import convertToURL from '@modules/post/utils/convertToURL';

export default class PostController {
    async show(request: Request, response: Response) {
        const { post_id } = request.params;

        const showPost = container.resolve(ShowPostService);

        const post = await showPost.execute({ post_id });

        post.banner = !!post.banner ? convertToURL(post.banner) : '';

        return response.json(post);
    }

    async index(_: Request, response: Response) {
        const listPosts = container.resolve(ListPostsService);

        const posts = await listPosts.execute();

        const mappedPosts = posts.map(post => ({
            ...post,
            banner: convertToURL(post.banner),
        }));

        return response.json(mappedPosts);
    }

    async create(request: Request, response: Response) {
        const { title, content } = request.body;

        const createPost = container.resolve(CreatePostService);

        const post = await createPost.execute({ title, content });

        response.json(post);
    }
}
