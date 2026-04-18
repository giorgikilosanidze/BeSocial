import { useEffect } from 'react';

type PreviewVariant = 'profile' | 'cover';

interface ImagePreviewModalProps {
	imageSrc: string;
	imageAlt: string;
	variant: PreviewVariant;
	onClose: () => void;
}

const ImagePreviewModal = ({ imageSrc, imageAlt, variant, onClose }: ImagePreviewModalProps) => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	return (
		<div className="fixed inset-0 z-[240] flex items-center justify-center p-4 sm:p-6">
			<div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
			<div
				onClick={(event) => event.stopPropagation()}
				className={`relative z-10 flex items-center justify-center ${
					variant === 'profile' ? 'w-auto max-w-none' : 'w-full max-w-6xl'
				}`}
			>
				<button
					onClick={onClose}
					className="fixed top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
					aria-label="Close image preview"
				>
					✕
				</button>

				{variant === 'profile' ? (
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-[min(85vw,520px)] h-[min(85vw,520px)] object-cover rounded-full border-4 border-white/70"
					/>
				) : (
					<img
						src={imageSrc}
						alt={imageAlt}
						className="max-w-full max-h-[85vh] object-contain rounded-xl"
					/>
				)}
			</div>
		</div>
	);
};

export default ImagePreviewModal;
