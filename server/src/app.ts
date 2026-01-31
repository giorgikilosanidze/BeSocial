import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import feedRoutes from './modules/feed/feed.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import multer, { FileFilterCallback } from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const fileStorage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, 'images');
	},
	filename(req, file, callback) {
		callback(null, Date.now() + '-' + file.originalname);
	},
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
	const allowedTypes = ['image/png', 'image/jpeg'];

	if (allowedTypes.includes(file.mimetype)) {
		callback(null, true); // accept file
	} else {
		callback(new Error('Only PNG and JPEG images are allowed!') as any, false);
	}
};

app.use(cookieParser());
app.use(express.json());
app.use(
	multer({
		storage: fileStorage,
		limits: { fileSize: 5 * 1024 * 1024 },
		fileFilter,
	}).array('image', 5),
);
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // OPTIONS handled automatically
		credentials: true,
	}),
);
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/profile', profileRoutes);

app.use('/api', (req: Request, res: Response) => {
	return res.status(404).json({ message: 'API route not found!' });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong!';

	return res.status(status).json({ message });
});

export default app;
