import dummyProfilePicture from '@/assets/user.jpg';
import type { ChatPreviewItem } from './chatUiMock';

interface ChatPreviewDropdownProps {
	chats: ChatPreviewItem[];
	onOpenChat: (chatId: string) => void;
	onSeeAll: () => void;
}

const ChatPreviewDropdown = ({ chats, onOpenChat, onSeeAll }: ChatPreviewDropdownProps) => {
	const previewChats = chats.slice(0, 5);
	const hasMoreChats = chats.length > 5;

	return (
		<div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden">
			<div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
				<h3 className="text-base font-bold text-gray-900">Chats</h3>
				<span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
					{chats.length}
				</span>
			</div>

			<div className="max-h-[360px] overflow-y-auto">
				{previewChats.map((chat) => (
					<button
						key={chat.id}
						onClick={() => onOpenChat(chat.id)}
						className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
					>
						<div className="flex items-center gap-3">
							<img
								src={chat.avatarUrl || dummyProfilePicture}
								alt={chat.username}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div className="min-w-0 flex-1">
								<div className="flex items-center justify-between gap-2">
									<p className="text-sm font-semibold text-gray-900 truncate">{chat.username}</p>
									<span className="text-[11px] text-gray-500 shrink-0">{chat.lastMessageAt}</span>
								</div>
								<p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
							</div>
							{chat.unreadCount > 0 && (
								<span className="min-w-5 h-5 px-1 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center">
									{chat.unreadCount}
								</span>
							)}
						</div>
					</button>
				))}

				{previewChats.length === 0 && (
					<div className="p-6 text-center text-sm text-gray-500">No chats yet</div>
				)}
			</div>

			{hasMoreChats && (
				<div className="px-4 py-3 border-t border-gray-100 bg-gray-50/60">
					<button
						onClick={onSeeAll}
						className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
					>
						See all chats
					</button>
				</div>
			)}
		</div>
	);
};

export default ChatPreviewDropdown;
