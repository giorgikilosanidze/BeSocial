import routes from '@/constants/routes';
import { deletePost, editPost, sendReactionData } from '@/features/feed/feedThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import Like from '@/svg/Like';
import LikeButtonSvg from '@/svg/LikeButtonSvg';
import LoveButtonSvg from '@/svg/LoveButtonSvg';
import AngryButtonSvg from '@/svg/AngryButtonSvg';
import Love from '@/svg/Love';
import Angry from '@/svg/Angry';
import type { EditPostData, PostCardProps, ReactionTypes } from '@/types/feed';
import { timeAgo } from '@/utils/formatTime';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const PostCard = ({ post }: PostCardProps) => {
	const userId = useAppSelector((state) => state.auth.user.id);
	const profilePictureUrl = post.author.profilePictureUrl;
	const [optionsVisibility, setOptionsVisibility] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editedText, setEditedText] = useState('');
	const threeDotsParentRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [instantReact, setInstantReact] = useState<ReactionTypes | null>(
		post.userReaction || null,
	);

	const hasPermission = post.author._id === userId;

	const activeReaction = instantReact;

	const isLike = activeReaction === 'like';
	const isLove = activeReaction === 'love';
	const isAngry = activeReaction === 'angry';

	const profilePictureSrc = profilePictureUrl
		? `${SERVER_URL}/${profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

	const postCreatedAgo = timeAgo(post.createdAt);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const path = event.composedPath();

			if (threeDotsParentRef.current && !path.includes(threeDotsParentRef.current)) {
				setOptionsVisibility(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [optionsVisibility]);

	const handleReaction = (reactionType: ReactionTypes) => {
		if (instantReact === reactionType) {
			setInstantReact(null);
		} else {
			setInstantReact(reactionType);
		}

		dispatch(sendReactionData({ postId: post.id, userId: userId, reactionType }));
	};

	const handleGoToProfilePage = () => {
		navigate(routes.profile.replace(':userId', post.author._id));
	};

	const toggleOptionsVisibility = () => {
		setOptionsVisibility(!optionsVisibility);
	};

	const handleEditMode = (mode: boolean) => {
		setIsEditMode(mode);

		if (mode) {
			toggleOptionsVisibility();
		}
	};

	const handleTextEdit = (newValue: string) => {
		setEditedText(newValue);
	};

	const handleEditSave = async () => {
		if (post.text === editedText) {
			return;
		}

		const editPostData: EditPostData = {
			postId: post.id,
			post: {
				text: editedText,
			},
		};

		try {
			await dispatch(editPost(editPostData)).unwrap();
			setIsEditMode(false);
		} catch (error) {
			console.error('Edit post failed!', error);
		}
	};

	const handleDelete = async () => {
		try {
			dispatch(deletePost(post.id)).unwrap();
			setIsEditMode(false);
		} catch (error) {
			console.error('Delete post failed!', error);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			{/* Post Header */}
			<div className="p-4 flex items-start justify-between">
				<div className="flex space-x-3">
					<div
						onClick={handleGoToProfilePage}
						className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
					>
						<img
							src={profilePictureSrc}
							alt={post.author.username}
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<h4
							onClick={handleGoToProfilePage}
							className="font-semibold text-gray-900 text-sm cursor-pointer"
						>
							{post.author.username}
						</h4>
						<p className="text-xs text-gray-500">
							{postCreatedAgo}
							{/* Edited indicator */}
							{post.isEdited && <span className="ml-1 text-gray-400">(edited)</span>}
						</p>
					</div>
				</div>
				{hasPermission && (
					<div className="relative" ref={threeDotsParentRef}>
						<button
							onClick={toggleOptionsVisibility}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
							</svg>
						</button>

						{optionsVisibility && (
							<div className="absolute right-0 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
								<button
									onClick={() => handleEditMode(true)}
									className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg"
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
											d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
										/>
									</svg>
									<span>Edit</span>
								</button>
								<button
									onClick={handleDelete}
									className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
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
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
									<span>Delete</span>
								</button>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Post Content */}
			<div className="px-4 pb-3">
				{!isEditMode && (
					<p className="text-gray-800 text-sm leading-relaxed">{post.text}</p>
				)}

				{isEditMode && (
					<div className="mt-2">
						<textarea
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								handleTextEdit(e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none overflow-y-hidden"
							rows={3}
							defaultValue={post.text}
							placeholder="Edit your post..."
						/>
						<div className="flex justify-end space-x-2 mt-2">
							<button
								onClick={() => handleEditMode(false)}
								className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleEditSave}
								className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
							>
								Save
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Post Image */}
			{post.imageUrls &&
				post.imageUrls.map((url) => (
					<div key={url} className="w-full">
						<img
							src={`${SERVER_URL}${url}`}
							alt="Post"
							className="w-full object-cover max-h-96"
						/>
					</div>
				))}

			{/* Reactions Summary */}
			<div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
				<div className="flex items-center space-x-2">
					<div className="flex -space-x-1">
						<Like />
						<Love />
						<Angry />
					</div>
					{/* <span>{post.likes + post.loves + post.angry}</span> */}
				</div>
				<div className="flex items-center space-x-4">
					<button className="hover:underline">{post.comments} comments</button>
					<span>12 shares</span>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="px-4 py-2 flex items-center justify-around border-b border-gray-100">
				{/* Like button with reaction picker */}
				<div className="relative group">
					{/* Reaction Picker - Shows on hover */}
					<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
						<div className="bg-white rounded-full shadow-lg border border-gray-200 px-5 py-3 flex items-center gap-4">
							{/* Like Reaction */}
							<button
								onClick={() => handleReaction('like')}
								className="transform hover:scale-125 transition-transform duration-150 cursor-pointer"
								aria-label="Like"
							>
								<Like
									divWidth="w-7"
									divHeight="h-7"
									svgWidth="w-5"
									svgHeight="h-5"
								/>
							</button>

							{/* Love Reaction */}
							<button
								onClick={() => handleReaction('love')}
								className="transform hover:scale-125 transition-transform duration-150 cursor-pointer"
								aria-label="Love"
							>
								<Love
									divWidth="w-7"
									divHeight="h-7"
									svgWidth="w-5"
									svgHeight="h-5"
								/>
							</button>

							{/* Angry Reaction */}
							<button
								onClick={() => handleReaction('angry')}
								className="transform hover:scale-125 transition-transform duration-150 cursor-pointer"
								aria-label="Angry"
							>
								<Angry
									divWidth="w-7"
									divHeight="h-7"
									svgWidth="w-5"
									svgHeight="h-5"
								/>
							</button>
						</div>
					</div>

					{/* Reaction Button — changes based on userReaction */}
					<button
						onClick={() => handleReaction('like')}
						className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
							isLike
								? 'text-blue-600'
								: isLove
									? 'text-red-500'
									: isAngry
										? 'text-orange-500'
										: 'text-gray-600 hover:bg-gray-100'
						}`}
					>
						{/* Icon changes based on reaction type */}
						{isLove ? (
							<LoveButtonSvg isActive />
						) : isAngry ? (
							<AngryButtonSvg isActive />
						) : (
							<LikeButtonSvg isLiked={isLike} />
						)}

						{/* Label changes based on reaction type */}
						<span className="font-medium text-sm">
							{isLove ? 'Love' : isAngry ? 'Angry' : 'Like'}
						</span>
					</button>
				</div>
				<button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
					<span className="font-medium text-sm">Comment</span>
				</button>
				<button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
						/>
					</svg>
					<span className="font-medium text-sm">Share</span>
				</button>
			</div>

			{/* Comments Section - Always hidden for UI demo */}
			{/* You can show this conditionally based on your logic */}
		</div>
	);
};

export default PostCard;
