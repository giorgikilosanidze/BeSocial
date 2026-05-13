import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

	io.on('connection', (socket) => {
		const userId = socket.handshake.query.userId as string;

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
