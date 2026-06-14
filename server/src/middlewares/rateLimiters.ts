import rateLimit from 'express-rate-limit';

// Throttle credential endpoints (login/signup/refresh) per IP to blunt
// brute-force and credential-stuffing attempts.
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 30,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: 'Too many attempts. Please try again in a few minutes.' },
});
