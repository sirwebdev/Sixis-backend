import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/schemas/Post';

export default interface IPostsRespository {
    create(data: ICreatePostDTO): Promise<Post>;
    findAllPosts(): Promise<Post[]>;
}
