import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureAdminType(
    request: Request,
    _: Response,
    next: NextFunction,
): void {
    const { type } = request.user;

    if (type !== 'admin')
        throw new AppError(
            'User not authorized. Only user of type admin can make this action',
            401,
        );

    return next();
}
