import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UserRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({
            where: { email: email.toLocaleLowerCase() },
        });

        return user;
    }

    async create({ email }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            email: email.toLocaleLowerCase(),
        });

        console.log('Cheguei Aqui \n\n\n\n\n\n\n');

        await this.ormRepository.save(user);

        return user;
    }

    async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UserRepository;
