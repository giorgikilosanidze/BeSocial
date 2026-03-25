import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import SERVER_URL from '@/constants/serverUrl';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getPostReactionsList } from '@/features/feed/feedThunks';
import type { GetPostReactionsResponse } from '@/types/feed';
import Like from '@/svg/Like';
import Love from '@/svg/Love';
import Angry from '@/svg/Angry';
import dummyProfilePicture from '../assets/user.jpg';

interface ReactionsModalProps {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	postId: string;
}

const ReactionsModal = ({ setIsModalOpen, postId }: ReactionsModalProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.auth.user.id);
	const [reactions, setReactions] = useState<GetPostReactionsResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchReactions = async () => {
			try {
				const result = await dispatch(getPostReactionsList(postId)).unwrap();

				// Sort reactions to place current user at the top
				const sortedResult = [...result].sort((a, b) => {
					if (a.user._id === userId) return -1;
					if (b.user._id === userId) return 1;
					return 0;
				});

				setReactions(sortedResult);
			} catch (error) {
				console.error('Failed to fetch reactions', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchReactions();
	}, [dispatch, postId, userId]);

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

	const renderReactionIcon = (type: string) => {
		if (type === 'love')
			return <Love divWidth="w-5" divHeight="h-5" svgWidth="w-3" svgHeight="h-3" />;
		if (type === 'angry')
			return <Angry divWidth="w-5" divHeight="h-5" svgWidth="w-3" svgHeight="h-3" />;
		return <Like divWidth="w-5" divHeight="h-5" svgWidth="w-3" svgHeight="h-3" />;
	};

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

			<div
				onClick={(e) => e.stopPropagation()}
				className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
			>
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-lg font-bold text-gray-900">Reactions</h2>
						{!isLoading && reactions && (
							<span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
								{reactions.length}
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

				<div className="overflow-y-auto flex-1 p-2">
					{isLoading && (
						<div className="flex items-center justify-center py-12">
							<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{!isLoading && reactions && reactions.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12 text-gray-400">
							<p className="text-sm font-medium">No reactions yet.</p>
						</div>
					)}

					{!isLoading && reactions && reactions.length > 0 && (
						<div className="space-y-1">
							{reactions.map((reaction) => {
								const profilePictureSrc = reaction.user.profilePictureUrl
									? `${SERVER_URL}/${reaction.user.profilePictureUrl}`
									: dummyProfilePicture;

								return (
									<div
										key={reaction._id}
										className="flex items-center justify-between rounded-xl p-3 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center space-x-3 min-w-0">
											<div className="relative">
												<img
													onClick={() =>
														navigate(`/profile/${reaction.user._id}`)
													}
													src={profilePictureSrc}
													alt={reaction.user.username}
													className="w-11 h-11 rounded-full object-cover cursor-pointer"
												/>
												<div className="absolute -bottom-1 -right-1 rounded-full shadow-sm bg-white p-[2px]">
													<div className="flex items-center justify-center">
														{renderReactionIcon(reaction.type)}
													</div>
												</div>
											</div>
											<div className="min-w-0">
												<p
													onClick={() =>
														navigate(`/profile/${reaction.user._id}`)
													}
													className="font-semibold text-sm text-gray-900 truncate cursor-pointer hover:underline"
												>
													{reaction.user.username}
												</p>
											</div>
										</div>
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

export default ReactionsModal;
