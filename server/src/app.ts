import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import feedRoutes from './modules/feed/feed.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';
import notificationRoutes from './modules/notification/notification.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { searchUsers } from './modules/user/user.repository.js';
import authGuard from './middlewares/authGuard/authGuard.js';

dotenv.config();

const app = express();

// Behind Render's proxy (and the Vercel rewrite), the real client IP arrives in
// X-Forwarded-For. Trust the first proxy hop so rate limiting keys on the actual
// client and secure-cookie detection works correctly.
app.set('trust proxy', 1);

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // OPTIONS handled automatically
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', notificationRoutes);

app.get(
	'/api/search',
	authGuard,
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
					followersCount: user.followers?.length || 0,
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
