import dummyProfilePicture from '@/assets/user.jpg';
import type { ChatComponentProps } from '@/types/chat';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChatWidget = ({ chat, onMessage, onClose }: ChatComponentProps) => {
	const [message, setMessage] = useState('');

	const handleSend = () => {
		onMessage({
			sender: 'me',
			text: message,
			id: uuidv4(),
			time: new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			}),
		});

		setMessage('');
	};

	const handleMessageTyping = (value: string) => {
		setMessage(value);
	};

	if (!chat) return null;

	return (
		<div className="fixed z-[120] right-4 bottom-4 md:right-6 lg:right-8 w-[calc(100vw-2rem)] sm:w-[360px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
			<div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
				<div className="flex items-center gap-3 min-w-0">
					<img
						src={chat.avatarUrl || dummyProfilePicture}
						alt={chat.username}
						className="w-9 h-9 rounded-full object-cover"
					/>
					<div className="min-w-0">
						<p className="text-sm font-semibold text-gray-900 truncate">
							{chat.username}
						</p>
						<p className="text-[11px] text-green-600">Active now</p>
					</div>
				</div>
				<button
					onClick={onClose}
					className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div className="h-[300px] overflow-y-auto px-3 py-3 bg-gradient-to-b from-gray-50 to-white">
				<div className="space-y-2">
					{chat.messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
									message.sender === 'me'
										? 'bg-blue-600 text-white rounded-br-md'
										: 'bg-gray-100 text-gray-800 rounded-bl-md'
								}`}
							>
								<p>{message.text}</p>
								<p
									className={`text-[10px] mt-1 ${
										message.sender === 'me' ? 'text-blue-100' : 'text-gray-400'
									}`}
								>
									{message.time}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="p-3 border-t border-gray-100 bg-white">
				<div className="flex items-center gap-2">
					<input
						value={message}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && message) {
								handleSend();
							}
						}}
						onChange={(e) => handleMessageTyping(e.target.value)}
						type="text"
						placeholder="Write a message..."
						className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
					/>
					<button
						onClick={handleSend}
						className={`h-9 px-4 rounded-full bg-blue-600 text-white text-sm font-medium ${message ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
						disabled={message ? false : true}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatWidget;
