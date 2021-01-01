import {
    Entity,
    ObjectID,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
class Post {
    @ObjectIdColumn()
    id: ObjectID;

    @Column('uuid')
    post_id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    banner: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Post;
