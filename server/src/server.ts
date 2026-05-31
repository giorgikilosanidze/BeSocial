import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './modules/user/user.model.js';
import { init, markUserOffline, markUserOnline } from './socket.js';

dotenv.config();

const PORT = parseFloat(process.env.PORT ?? '3000');
try {
	await mongoose.connect(process.env.MONGODB_URI as string);

	const server = app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});

	const io = init(server);

	// Authenticate every socket connection: the client must present a valid
	// short-lived token (issued by GET /api/auth/socket-token). The userId is
	// taken from the verified token, never from client-supplied handshake data,
	// which prevents impersonating another user's notification/chat rooms.
	io.use((socket, next) => {
		const token = socket.handshake.auth?.token as string | undefined;

		if (!token) {
			return next(new Error('NO_SOCKET_TOKEN'));
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
				id: string;
			};
			socket.data.userId = decoded.id;
			return next();
		} catch {
			return next(new Error('INVALID_SOCKET_TOKEN'));
		}
	});

	io.on('connection', (socket) => {
		const userId = socket.data.userId as string;

		if (userId) {
			socket.join(userId);
			const becameOnline = markUserOnline(userId);
			if (becameOnline) {
				io.emit('userPresenceChanged', {
					userId,
					isOnline: true,
					lastSeenAt: null,
				});
			}
			console.log(`User ${userId} joined room. Socket ID: ${socket.id}`);
		}

		socket.on('disconnect', async () => {
			if (!userId) return;

			const becameOffline = markUserOffline(userId);
			if (!becameOffline) return;

			const lastSeenAt = new Date();
			await User.updateOne({ _id: userId }, { $set: { lastSeenAt } });
			io.emit('userPresenceChanged', {
				userId,
				isOnline: false,
				lastSeenAt: lastSeenAt.toISOString(),
			});
		});
	});
} catch (error) {
	console.log(error);
}
