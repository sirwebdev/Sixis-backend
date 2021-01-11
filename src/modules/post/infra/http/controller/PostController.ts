import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/post/services/CreatePostService';
import ListPostsService from '@modules/post/services/ListPostsService';
import ShowPostService from '@modules/post/services/ShowPostService';
import convertToURL from '@modules/post/utils/convertToURL';
import DeletePostService from '@modules/post/services/DeletePostService';
import UpdatePostService from '@modules/post/services/UpdatePostService';

export default class PostController {
    async show(request: Request, response: Response) {
        const { post_id } = request.params;

        const showPost = container.resolve(ShowPostService);

        const post = await showPost.execute({ post_id });

        post.banner = post.banner ? convertToURL(post.banner) : '';

        return response.json(post);
    }

    async index(_: Request, response: Response) {
        const listPosts = container.resolve(ListPostsService);

        const posts = await listPosts.execute();

        const mappedPosts = posts.map(post => ({
            ...post,
            banner: post.banner ? convertToURL(post.banner) : '',
        }));

        return response.json(mappedPosts);
    }

    async create(request: Request, response: Response) {
        const { title, content } = request.body;

        const createPost = container.resolve(CreatePostService);

        const post = await createPost.execute({ title, content });

        response.json(post);
    }

    async update(request: Request, response: Response) {
        const { post_id } = request.params;
        const { title, content } = request.body;

        const updatePost = container.resolve(UpdatePostService);

        const updatedPost = await updatePost.execute({
            post_id,
            title,
            content,
        });

        return response.json(updatedPost);
    }

    async delete(request: Request, response: Response) {
        const { post_id } = request.params;

        const deletePost = container.resolve(DeletePostService);

        await deletePost.execute({ post_id });

        return response.status(204).json();
    }
}
