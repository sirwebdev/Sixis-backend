import { Server } from 'socket.io';

declare namespace Express {
    export interface Request {
        user: {
            id: string;
            type: 'admin' | 'user';
        };

        socket: {};
    }
}
