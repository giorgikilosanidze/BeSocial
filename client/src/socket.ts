import { io, type Socket } from 'socket.io-client';
import API_BASE, { BACKEND_URL } from './constants/serverUrl';

// Fetch a short-lived socket token from the authenticated (cookie-backed) HTTP
// endpoint. This goes through the same-origin proxy, so the auth cookie is sent
// even though the socket itself connects to the backend on a different origin.
async function fetchSocketToken(): Promise<string | null> {
	try {
		const response = await fetch(`${API_BASE}/api/auth/socket-token`, {
			credentials: 'include',
		});
		if (!response.ok) return null;
		const data = await response.json();
		return data.token ?? null;
	} catch {
		return null;
	}
}

export const socket: Socket = io(BACKEND_URL, {
	withCredentials: true,
	autoConnect: false,
	// Called before every (re)connection attempt, so the token is always fresh.
	auth: (cb) => {
		fetchSocketToken().then((token) => cb({ token }));
	},
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
