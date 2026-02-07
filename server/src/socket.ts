import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

let io: Server | undefined;

export const init = (server: http.Server): Server => {
	io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true,
		},
	});

	return io;
};

export const getIO = (): Server => {
	if (!io) throw new Error('Socket.IO not initialized!');
	return io;
};
