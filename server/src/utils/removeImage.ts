import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function removeImage(imagePath: string) {
	const fullPath = path.join(__dirname, '../..', imagePath);
	fs.unlink(fullPath, (err) => {
		if (err) {
			throw new Error('Could not remove image!');
		}
	});
}
