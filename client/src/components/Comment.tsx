import { timeAgo } from '@/utils/formatTime';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface CommentProps {
	username: string;
	text: string;
	createdAt: string;
	profilePictureUrl?: string;
}

const Comment = ({ username, text, createdAt, profilePictureUrl }: CommentProps) => {
	const avatarSrc = profilePictureUrl
		? `${SERVER_URL}/${profilePictureUrl}`
		: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=2563eb&color=fff&size=64`;

	const commentTimeAgo = timeAgo(createdAt);

	return (
		<div className="flex space-x-2.5 py-2">
			<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
				<img src={avatarSrc} alt={username} className="w-full h-full object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="bg-gray-100 rounded-2xl px-3.5 py-2.5">
					<p className="font-semibold text-[13px] text-gray-900 leading-tight">
						{username}
					</p>
					<p className="text-sm text-gray-800 mt-0.5 leading-snug break-words">{text}</p>
				</div>
				<span className="text-xs text-gray-400 ml-3 mt-1 block">{commentTimeAgo}</span>
			</div>
		</div>
	);
};

export default Comment;
