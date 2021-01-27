import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import ListPostsService from './ListPostsService';

let listPosts: ListPostsService;
let fakePostsRepository: FakePostsRepository;

describe('ListPostsService', () => {
    beforeEach(() => {
        fakePostsRepository = new FakePostsRepository();
        listPosts = new ListPostsService(fakePostsRepository);
    });

    it('should be able to list all storaged posts', async () => {
        const posts = await listPosts.execute();

        expect(posts).toBeInstanceOf(Array);
    });
});
