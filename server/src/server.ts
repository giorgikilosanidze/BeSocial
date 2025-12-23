import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = parseFloat(process.env.PORT ?? '3000');

await mongoose.connect(process.env.MONGODB_URI as string);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
