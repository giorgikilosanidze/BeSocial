import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { init } from './socket.js';

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
			console.log(`User ${userId} joined room. Socket ID: ${socket.id}`);
		}
	});
} catch (error) {
	console.log(error);
}
