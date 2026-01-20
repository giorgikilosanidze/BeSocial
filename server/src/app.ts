import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import feedRoutes from './modules/feed/feed.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
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
