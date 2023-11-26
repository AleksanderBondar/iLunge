import { Server } from 'socket.io';
import { ioLog } from '../utils/logger.js';

type User = { city: string; lat: number; lon: number };

export const IO = (server: Express.Application) => {
    const users = new Map<string, User>();
    const ioServer = new Server(server);
    ioServer.on('connection', client => {
        client.on('userAdd', (userDetails: User) => {
            users.set(client.id, { ...userDetails });
            ioLog(`User ${client.id} connected ${Array.from(users.values()).length} users connected`, 'connection');
            client.emit('users', Array.from(users.values()));
        });

        client.on('disconnect', () => {
            users.delete(client.id);
            ioLog(`User ${client.id} disconnected ${Array.from(users.values()).length} users connected`, 'disconnect');
            client.emit('users', Array.from(users.values()));
        });
    });
};
