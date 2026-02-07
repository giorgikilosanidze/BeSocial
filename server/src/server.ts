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
		console.log('client connected:', socket.id);
	});
} catch (error) {
	console.log(error);
}
