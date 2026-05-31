import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		server: {
			// Proxy /api/* to the backend in dev so HTTP requests are same-origin
			// (matches the Vercel rewrite used in production). Keeps auth cookies
			// first-party. The socket connects directly via VITE_SERVER_URL.
			proxy: {
				'/api': {
					target: env.VITE_SERVER_URL || 'http://localhost:3000',
					changeOrigin: true,
				},
			},
		},
	};
});
