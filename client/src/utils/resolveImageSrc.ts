import { BACKEND_URL } from '@/constants/serverUrl';

const CLOUDINARY_MARKER = '/image/upload/';

// Inject Cloudinary delivery optimizations into an upload URL:
//  - f_auto: serve a modern format (WebP/AVIF) when the browser supports it
//  - q_auto: automatically pick the smallest quality that still looks good
//  - w_<width> + c_limit: downscale to the size actually rendered (never upscales)
// This shrinks image bytes dramatically without changing what's stored.
const optimizeCloudinary = (url: string, width?: number) => {
	const markerIndex = url.indexOf(CLOUDINARY_MARKER);
	if (markerIndex === -1) return url; // not a Cloudinary upload URL — leave as-is

	const afterMarker = url.slice(markerIndex + CLOUDINARY_MARKER.length);

	// If a transformation segment is already present (e.g. "f_auto,..."), don't
	// add another one. Cloudinary version segments look like "v123456" (no early
	// underscore), so they won't be mistaken for a transform.
	if (/^[a-z]{1,3}_[a-z0-9]/.test(afterMarker)) return url;

	const transforms = ['f_auto', 'q_auto'];
	if (width) transforms.push(`w_${width}`, 'c_limit');

	return `${url.slice(0, markerIndex + CLOUDINARY_MARKER.length)}${transforms.join(',')}/${afterMarker}`;
};

export const resolveImageSrc = (url?: string | null, fallback?: string, width?: number) => {
	if (!url) return fallback ?? '';
	if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/src/')) return url;
	if (url.startsWith('http://') || url.startsWith('https://')) return optimizeCloudinary(url, width);
	return `${BACKEND_URL}/${url}`;
};

export default resolveImageSrc;
