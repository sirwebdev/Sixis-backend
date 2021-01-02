import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/post/providers';

import '@shared/container/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IPostsRespository from '@modules/post/repositories/IPostsRepository';
import PostsRepository from '@modules/post/infra/typeorm/repositories/PostsRepository';

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

container.registerSingleton<IPostsRespository>(
    'PostsRepository',
    PostsRepository,
);
