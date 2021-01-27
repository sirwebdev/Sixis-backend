declare namespace Express {
    export interface Request {
        user: {
            id: string;
            type: 'admin' | 'user';
        };
    }
}
