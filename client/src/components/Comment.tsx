import routes from '@/constants/routes';
import { deleteComment } from '@/features/feed/feedThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { timeAgo } from '@/utils/formatTime';
import { Link } from 'react-router-dom';
import dummyProfilePicture from '../assets/user.jpg';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface CommentProps {
	id: string;
	postId: string;
	userId: string;
	hasPermission: boolean;
	username: string;
	text: string;
	createdAt: string;
	profilePictureUrl?: string;
}

const Comment = ({
	id,
	postId,
	userId,
	hasPermission,
	username,
	text,
	createdAt,
	profilePictureUrl,
}: CommentProps) => {
	const dispatch = useAppDispatch();

	const avatarSrc = profilePictureUrl
		? `${SERVER_URL}/${profilePictureUrl}`
		: dummyProfilePicture;

	const commentTimeAgo = timeAgo(createdAt);

	const handleDelete = () => {
		dispatch(deleteComment({ postId, commentId: id }));
	};

	return (
		<div className="flex space-x-2.5 py-2">
			<Link
				to={routes.profile.replace(':userId', userId)}
				className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 block"
			>
				<img src={avatarSrc} alt={username} className="w-full h-full object-cover" />
			</Link>
			<div className="flex-1 min-w-0">
				<div className="bg-gray-100 rounded-2xl px-3.5 py-2.5">
					<div className="flex items-center justify-between">
						<Link
							to={routes.profile.replace(':userId', userId)}
							className="font-semibold text-[13px] text-gray-900 leading-tight hover:underline"
						>
							{username}
						</Link>
						{hasPermission && (
							<button
								onClick={handleDelete}
								type="button"
								className="text-red-500 hover:text-red-600 transition-colors"
								aria-label="Delete comment"
							>
								<svg
									className="w-4 h-4"
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
							</button>
						)}
					</div>
					<p className="text-sm text-gray-800 mt-0.5 leading-snug break-words">{text}</p>
				</div>
				<span className="text-xs text-gray-400 ml-3 mt-1 block">{commentTimeAgo}</span>
			</div>
		</div>
	);
};

export default Comment;
