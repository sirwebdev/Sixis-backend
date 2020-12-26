import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UserRepository implements IUsersRepository {
    private users: User[] = [];

    async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);

        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    async create({ email }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            id: v4(),
            email,
        });

        this.users.push(user);

        return user;
    }

    async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            foundUser => foundUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default UserRepository;
