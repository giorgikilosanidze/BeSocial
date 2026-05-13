import { io, type Socket } from 'socket.io-client';
import SERVER_URL from './constants/serverUrl';

export const socket: Socket = io(SERVER_URL, {
	withCredentials: true,
	autoConnect: false,
});

export const connectWithUser = (userId: string) => {
	if (!userId) return;

	socket.io.opts.query = { userId };

	if (socket.connected) {
		socket.disconnect();
	}

	socket.connect();
};

export const disconnectSocket = () => {
	socket.io.opts.query = {};
	socket.disconnect();
};
