import { useState, type KeyboardEvent } from 'react';
import dummyProfilePicture from '../assets/user.jpg';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface CommentInputProps {
	profilePictureUrl?: string;
	onSubmitComment: (text: string) => Promise<boolean>;
}

const CommentInput = ({ profilePictureUrl, onSubmitComment }: CommentInputProps) => {
	const [text, setText] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const avatarSrc = profilePictureUrl
		? `${SERVER_URL}/${profilePictureUrl}`
		: dummyProfilePicture;

	const handleAddComment = async () => {
		if (isSubmitting) return;
		const trimmedText = text.trim();

		if (!trimmedText) return;

		setIsSubmitting(true);

		try {
			const isSent = await onSubmitComment(trimmedText);

			if (isSent) {
				setText('');
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return;

		event.preventDefault();
		await handleAddComment();
	};

	return (
		<div className="flex items-center space-x-2.5 pt-2 border-t border-gray-100">
			<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
				<img src={avatarSrc} alt="Your avatar" className="w-full h-full object-cover" />
			</div>
			<div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleInputKeyDown}
					type="text"
					placeholder="Write a comment..."
					className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none min-w-0"
				/>
				<button
					onClick={handleAddComment}
					disabled={!text.trim() || isSubmitting}
					className="ml-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex-shrink-0"
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default CommentInput;
