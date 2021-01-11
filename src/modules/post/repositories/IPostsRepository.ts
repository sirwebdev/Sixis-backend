import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/schemas/Post';

export default interface IPostsRespository {
    create(data: ICreatePostDTO): Promise<Post>;
    findById(post_id: string): Promise<Post | undefined>;
    findAllPosts(): Promise<Post[]>;
    save(post: Post): Promise<Post>;
    deletePost(post_id: string): Promise<void>;
}
