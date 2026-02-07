import { io, type Socket } from 'socket.io-client';
import SERVER_URL from './constants/serverUrl';

export const socket: Socket = io(SERVER_URL, {
	withCredentials: true,
});
