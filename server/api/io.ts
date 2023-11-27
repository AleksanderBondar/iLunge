import { Server } from 'socket.io';
import { ioLog } from '../utils/logger.js';

type User = { city: string; lat: number; lon: number };
type MousePosition = { x: number; y: number };

export const IO = (server: Express.Application) => {
    const users = new Map<string, User>();
    const mousePositions = new Map<string, MousePosition>();

    const ioServer = new Server(server);
    ioServer.on('connection', client => {
        client.on('userAdd', (userDetails: User) => {
            users.set(client.id, { ...userDetails });
            ioLog(`User ${client.id} connected ${Array.from(users.values()).length} users connected`, 'connection');
            client.emit('users', Array.from(users.values()));
        });

        client.on('disconnect', () => {
            users.delete(client.id);
            mousePositions.delete(client.id);

            ioLog(`User ${client.id} disconnected ${Array.from(users.values()).length} users connected`, 'disconnect');
            client.emit('users', Array.from(users.values()));
            client.emit(
                'mousePositions',
                Array.from(mousePositions.entries()).map(([id, data]) => ({ id, ...data })),
            );
        });

        client.on('mouseMove', (data: MousePosition) => {
            mousePositions.set(client.id, data);
            client.emit(
                'mousePositions',
                Array.from(mousePositions.entries()).map(([id, data]) => ({ id, ...data })),
            );
        });

        client.on('mouseClick', (data: MousePosition) => {
            client.emit('mouseClick', data);
        });

        setInterval(() => {
            client.emit('users', Array.from(users.values()));
        }, 1000 * 60);
    });
};
