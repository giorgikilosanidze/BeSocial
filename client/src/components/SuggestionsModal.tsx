import SERVER_URL from '@/constants/serverUrl';
import type { Suggestions } from '@/types/feed';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import dummyProfilePicture from '../assets/user.jpg';

interface ModalProps {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	suggestions: Suggestions;
	isSuggestionsLoading: boolean;
	followActions: Record<string, 1 | 2>;
	handleFollow: (targetUserId: string) => void;
}

const Modal = ({
	setIsModalOpen,
	suggestions,
	isSuggestionsLoading,
	followActions,
	handleFollow,
}: ModalProps) => {
	const navigate = useNavigate();

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsModalOpen(false);
			}
		};

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscape);
		};
	}, [setIsModalOpen]);

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden"
			>
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-lg font-bold text-gray-900">All Suggestions</h2>
						{!isSuggestionsLoading && (
							<span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
								{suggestions.length}
							</span>
						)}
					</div>
					<button
						onClick={closeModal}
						className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="max-h-[70vh] overflow-y-auto">
					{isSuggestionsLoading && (
						<div className="flex items-center justify-center py-12">
							<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{!isSuggestionsLoading && suggestions.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12 text-gray-400">
							<svg
								className="w-12 h-12 mb-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17 20h5V4H2v16h5m10 0v-3.5a2.5 2.5 0 00-5 0V20m5 0H7"
								/>
							</svg>
							<p className="text-sm font-medium">No suggestions right now</p>
						</div>
					)}

					{!isSuggestionsLoading && suggestions.length > 0 && (
						<div className="p-2">
							{suggestions.map((suggestion) => {
								const profilePictureSrc = suggestion.profilePictureUrl
									? `${SERVER_URL}/${suggestion.profilePictureUrl}`
									: dummyProfilePicture;
								const action = followActions[suggestion._id] || 1;

								return (
									<div
										key={suggestion._id}
										className="flex items-center justify-between rounded-xl p-3 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center space-x-3 min-w-0">
											<img
												onClick={() =>
													navigate(`/profile/${suggestion._id}`)
												}
												src={profilePictureSrc}
												alt={suggestion.username}
												className="w-11 h-11 rounded-full object-cover cursor-pointer"
											/>
											<div className="min-w-0">
												<p
													onClick={() =>
														navigate(`/profile/${suggestion._id}`)
													}
													className="font-semibold text-sm text-gray-900 truncate cursor-pointer hover:underline"
												>
													{suggestion.username}
												</p>
												<p className="text-xs text-gray-500">
													Suggested for you
												</p>
											</div>
										</div>

										<button
											onClick={() => handleFollow(suggestion._id)}
											className={`font-medium text-xs px-3 py-1.5 rounded-lg transition-colors ${
												action === 1
													? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
													: 'bg-red-50 text-red-500 hover:bg-red-100'
											}`}
										>
											{action === 1 ? 'Follow' : 'Unfollow'}
										</button>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
