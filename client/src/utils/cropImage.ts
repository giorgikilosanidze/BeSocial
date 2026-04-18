import type { Area } from 'react-easy-crop';

const OUTPUT_MIME_TYPE = 'image/jpeg';
const OUTPUT_QUALITY = 0.92;

const loadImage = (src: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', () => reject(new Error('Failed to load image')));
		image.src = src;
	});

const toBlob = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> =>
	new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				reject(new Error('Failed to create image blob'));
				return;
			}

			resolve(blob);
		}, type, quality);
	});

export async function getCroppedImageFile({
	imageSrc,
	croppedAreaPixels,
	outputWidth,
	outputHeight,
	fileName,
}: {
	imageSrc: string;
	croppedAreaPixels: Area;
	outputWidth: number;
	outputHeight: number;
	fileName: string;
}) {
	const image = await loadImage(imageSrc);
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	if (!context) {
		throw new Error('Failed to initialize canvas context');
	}

	canvas.width = outputWidth;
	canvas.height = outputHeight;

	const sx = Math.max(0, Math.round(croppedAreaPixels.x));
	const sy = Math.max(0, Math.round(croppedAreaPixels.y));
	const sWidth = Math.max(1, Math.round(croppedAreaPixels.width));
	const sHeight = Math.max(1, Math.round(croppedAreaPixels.height));

	context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, outputWidth, outputHeight);

	const blob = await toBlob(canvas, OUTPUT_MIME_TYPE, OUTPUT_QUALITY);

	return new File([blob], fileName, { type: OUTPUT_MIME_TYPE });
}
