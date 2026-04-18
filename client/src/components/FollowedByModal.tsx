import routes from '@/constants/routes';
import SERVER_URL from '@/constants/serverUrl';
import type { FollowedByUser } from '@/types/profile';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import dummyProfilePicture from '../assets/user.jpg';

interface FollowedByModalProps {
	users: FollowedByUser[];
	onClose: () => void;
}

const FollowedByModal = ({ users, onClose }: FollowedByModalProps) => {
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
		<div className="fixed inset-0 z-[220] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
			<div
				onClick={(event) => event.stopPropagation()}
				className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
			>
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-lg font-bold text-gray-900">Followed By</h2>
						<span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
							{users.length}
						</span>
					</div>
					<button
						onClick={onClose}
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
					{users.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-gray-400">
							<p className="text-sm font-medium">No users found.</p>
						</div>
					) : (
						<div className="space-y-1">
							{users.map((user) => {
								const profilePictureSrc = user.profilePictureUrl
									? `${SERVER_URL}/${user.profilePictureUrl}`
									: dummyProfilePicture;

								return (
									<div
										key={user._id}
										className="flex items-center rounded-xl p-3 hover:bg-gray-50 transition-colors"
									>
										<Link
											to={routes.profile.replace(':userId', user._id)}
											onClick={onClose}
											className="flex items-center space-x-3 min-w-0 w-full"
										>
											<img
												src={profilePictureSrc}
												alt={user.username}
												className="w-11 h-11 rounded-full object-cover"
											/>
											<p className="font-semibold text-sm text-gray-900 truncate hover:underline">
												{user.username}
											</p>
										</Link>
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

export default FollowedByModal;
