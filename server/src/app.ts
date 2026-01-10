import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import feedRoutes from './modules/feed/feed.routes.js';
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
	})
);
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

export default app;
