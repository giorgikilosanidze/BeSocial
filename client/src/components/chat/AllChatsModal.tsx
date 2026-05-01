import { useEffect } from 'react';
import dummyProfilePicture from '@/assets/user.jpg';
import type { AllChatsModalProps } from '@/types/chat';

const AllChatsModal = ({ isOpen, chats, onClose, onOpenChat }: AllChatsModalProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

			<div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
					<div className="flex items-center gap-2 min-w-0">
						<h2 className="text-lg font-bold text-gray-900 truncate">All Chats</h2>
						<span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
							{chats.length}
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

				<div className="px-4 pt-4 pb-3 border-b border-gray-100">
					<div className="relative">
						<input
							type="text"
							placeholder="Search chats..."
							className="w-full bg-gray-100 border-0 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-not-allowed"
							disabled
						/>
						<svg
							className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				<div className="max-h-[65vh] overflow-y-auto p-2">
					{chats.length === 0 && (
						<div className="py-12 text-center text-sm text-gray-500">
							No chats found
						</div>
					)}

					{chats.map((chat) => (
						<button
							key={chat.id}
							onClick={() => onOpenChat(chat.id)}
							className="w-full p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
						>
							<div className="flex items-center gap-3">
								<img
									src={chat.avatarUrl || dummyProfilePicture}
									alt={chat.username}
									className="w-11 h-11 rounded-full object-cover"
								/>
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-2">
										<p className="text-sm font-semibold text-gray-900 truncate">
											{chat.username}
										</p>
										<span className="text-[11px] text-gray-500 shrink-0">
											{chat.lastMessageAt}
										</span>
									</div>
									<p className="text-xs text-gray-500 truncate">
										{chat.lastMessage}
									</p>
								</div>
								{chat.unreadCount > 0 && (
									<span className="min-w-5 h-5 px-1 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center">
										{chat.unreadCount}
									</span>
								)}
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllChatsModal;
