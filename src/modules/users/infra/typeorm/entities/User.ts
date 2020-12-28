import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column('varchar', { default: 'user' })
    type!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export default User;
