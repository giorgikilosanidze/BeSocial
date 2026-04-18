import { useEffect, useMemo, useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { getCroppedImageFile } from '@/utils/cropImage';

type CropMode = 'profile' | 'cover';

interface ImageCropModalProps {
	mode: CropMode;
	imageFile: File;
	isSaving: boolean;
	onCancel: () => void;
	onConfirm: (file: File) => Promise<void> | void;
}

const CROP_CONFIG = {
	profile: {
		aspect: 1,
		shape: 'round' as const,
		outputWidth: 400,
		outputHeight: 400,
		title: 'Crop Profile Picture',
		hint: 'Move and zoom to fit your profile picture.',
		fileName: 'profile-picture.jpg',
	},
	cover: {
		aspect: 3,
		shape: 'rect' as const,
		outputWidth: 1200,
		outputHeight: 400,
		title: 'Crop Cover Photo',
		hint: 'Move and zoom to fit your cover photo.',
		fileName: 'cover-photo.jpg',
	},
};

const ImageCropModal = ({ mode, imageFile, isSaving, onCancel, onConfirm }: ImageCropModalProps) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [localError, setLocalError] = useState('');

	const objectUrl = useMemo(() => URL.createObjectURL(imageFile), [imageFile]);
	const config = CROP_CONFIG[mode];

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [objectUrl]);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !isSaving) {
				onCancel();
			}
		};

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isSaving, onCancel]);

	const handleCropComplete = (_croppedArea: Area, croppedAreaPixelsData: Area) => {
		setCroppedAreaPixels(croppedAreaPixelsData);
	};

	const handleConfirm = async () => {
		if (!croppedAreaPixels) {
			setLocalError('Please adjust the crop area before saving.');
			return;
		}

		try {
			setLocalError('');
			const croppedFile = await getCroppedImageFile({
				imageSrc: objectUrl,
				croppedAreaPixels,
				outputWidth: config.outputWidth,
				outputHeight: config.outputHeight,
				fileName: config.fileName,
			});
			await onConfirm(croppedFile);
		} catch (error) {
			setLocalError((error as Error).message || 'Failed to crop image');
		}
	};

	return (
		<div className="fixed inset-0 z-[250] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={isSaving ? undefined : onCancel} />
			<div
				onClick={(event) => event.stopPropagation()}
				className="relative bg-white rounded-2xl w-full max-w-3xl mx-4 shadow-2xl overflow-hidden"
			>
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
					<div>
						<h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
						<p className="text-sm text-gray-500 mt-1">{config.hint}</p>
					</div>
					<button
						onClick={onCancel}
						disabled={isSaving}
						className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:cursor-not-allowed"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div className="p-6">
					<div
						className={`relative bg-gray-900 rounded-xl overflow-hidden ${
							mode === 'profile' ? 'h-[420px]' : 'h-[360px]'
						}`}
					>
						<Cropper
							image={objectUrl}
							crop={crop}
							zoom={zoom}
							aspect={config.aspect}
							cropShape={config.shape}
							showGrid={mode === 'cover'}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={handleCropComplete}
							minZoom={1}
							maxZoom={3}
						/>
					</div>

					<div className="mt-5">
						<label className="block text-sm text-gray-700 mb-2">Zoom</label>
						<input
							type="range"
							min={1}
							max={3}
							step={0.01}
							value={zoom}
							onChange={(event) => setZoom(Number(event.target.value))}
							className="w-full accent-blue-600"
						/>
					</div>

					{localError && <p className="mt-3 text-sm text-red-600">{localError}</p>}

					<div className="mt-6 flex items-center justify-end gap-3">
						<button
							onClick={onCancel}
							disabled={isSaving}
							className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed"
						>
							Cancel
						</button>
						<button
							onClick={handleConfirm}
							disabled={isSaving}
							className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
						>
							{isSaving ? 'Saving...' : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageCropModal;
