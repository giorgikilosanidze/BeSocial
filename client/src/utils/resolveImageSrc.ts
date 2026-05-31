import { BACKEND_URL } from '@/constants/serverUrl';

export const resolveImageSrc = (url?: string | null, fallback?: string) => {
	if (!url) return fallback ?? '';
	if (url.startsWith('http://') || url.startsWith('https://')) return url;
	if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/src/')) return url;
	return `${BACKEND_URL}/${url}`;
};

export default resolveImageSrc;
