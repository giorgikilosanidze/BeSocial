import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const fileStorage = new CloudinaryStorage({
	cloudinary,
	params: async (req, file) => ({
		folder: 'besocial',
		resource_type: 'image',
		public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
	}),
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
	const allowedTypes = ['image/png', 'image/jpeg'];

	if (allowedTypes.includes(file.mimetype)) {
		callback(null, true); // accept file
	} else {
		callback(new Error('Only PNG and JPEG images are allowed!') as any, false);
	}
};

// Configured uploader. Mounted only on the specific routes that accept images
// (and always AFTER authGuard) so that unauthenticated/unrelated requests can
// never trigger an upload to Cloudinary.
const upload = multer({
	storage: fileStorage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter,
});

export default upload;
