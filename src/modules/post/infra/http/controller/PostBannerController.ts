import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePostBannerService from '@modules/post/services/UpdatePostBannerService';

export default class PostBannerController {
    async create(request: Request, response: Response) {
        const { post_id } = request.params;

        const updateBanner = container.resolve(UpdatePostBannerService);

        const post = await updateBanner.execute({
            post_id,
            bannerFilename: request.file.filename,
        });

        return response.json(post);
    }
}
