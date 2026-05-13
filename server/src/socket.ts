import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

let io: Server | undefined;
const onlineConnections = new Map<string, number>();

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

export const markUserOnline = (userId: string) => {
	const currentConnections = onlineConnections.get(userId) || 0;
	onlineConnections.set(userId, currentConnections + 1);
	return currentConnections === 0;
};

export const markUserOffline = (userId: string) => {
	const currentConnections = onlineConnections.get(userId) || 0;
	if (currentConnections <= 1) {
		onlineConnections.delete(userId);
		return true;
	}

	onlineConnections.set(userId, currentConnections - 1);
	return false;
};

export const isUserOnline = (userId: string) => onlineConnections.has(userId);
