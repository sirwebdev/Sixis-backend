import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBannerService from '@modules/post/services/CreateBannerService';

export default class PostBannerController {
    async create(request: Request, response: Response) {
        const { post_id } = request.params;

        const updateBanner = container.resolve(CreateBannerService);

        const post = await updateBanner.execute({
            filename: request.file?.filename,
            post_id,
        });

        return response.json(post);
    }
}
