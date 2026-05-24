import cloudinary from '../config/cloudinary.js';

const CLOUDINARY_URL_PATTERN = /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/;

function extractPublicId(url: string): string | null {
	const match = url.match(CLOUDINARY_URL_PATTERN);
	return match ? match[1] : null;
}

export function removeImage(imageUrl: string) {
	if (!imageUrl) return;

	const publicId = extractPublicId(imageUrl);
	if (!publicId) return;

	cloudinary.uploader.destroy(publicId).catch((error) => {
		console.error('Failed to remove image from Cloudinary:', error);
	});
}
