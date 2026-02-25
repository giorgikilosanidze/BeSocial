import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import feedRoutes from './modules/feed/feed.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';
import notificationRoutes from './modules/notification/notification.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import multer, { FileFilterCallback } from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchUsers } from './modules/user/user.repository.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use('/images', express.static(path.join(__dirname, '../images')));
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
app.use('/api', notificationRoutes);

app.get(
	'/api/search',
	async (req: Request<{}, {}, {}, { search?: string }>, res: Response, next: NextFunction) => {
		const searchQuery = req.query.search;

		if (!searchQuery) {
			return res.status(400).json({ message: 'No search query provided!' });
		}

		try {
			const users = await searchUsers(searchQuery);
			const normalizedUsers = users.map((user) => {
				return {
					id: user._id,
					username: user.username,
					profilePictureUrl: user.profilePictureUrl,
				};
			});
			return res.status(200).json(normalizedUsers);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Search failed!' });
		}
	},
);

app.use('/api', (req: Request, res: Response) => {
	return res.status(404).json({ message: 'API route not found!' });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong!';

	return res.status(status).json({ message });
});

export default app;
