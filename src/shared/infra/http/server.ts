import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';

import '@shared/container';
import '@shared/infra/typeorm';

const app = express();
const serve = new HttpServer(app);
const io = new Server(serve);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);

io.on('connection', (socket: Server) => {
    console.log('A user connected');

    socket.on('createPost', () => {
        console.log('New post created');
    });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 500,
        message: 'Internal server error',
    });
});

app.use((request: Request, _: Response, next: NextFunction) => {
    // @ts-ignore
    request.socket = io;

    next();
});

app.listen(process.env.APP_PORT, () => {
    console.log('🚀 Server started on port : ', process.env.APP_PORT);
});
