export interface ChatPreviewItem {
	id: string;
	username: string;
	avatarUrl?: string;
	lastMessage: string;
	lastMessageAt: string;
	unreadCount: number;
}

export interface ChatMessageItem {
	id: string;
	sender: 'me' | 'them';
	text: string;
	time: string;
}

export interface ChatThreadItem extends ChatPreviewItem {
	messages: ChatMessageItem[];
}

export const CHAT_UI_MOCK_THREADS: ChatThreadItem[] = [
	{
		id: 'chat-1',
		username: 'nina_dev',
		lastMessage: 'I pushed the latest UI polish for cards.',
		lastMessageAt: '2m',
		unreadCount: 2,
		messages: [
			{ id: 'm-1', sender: 'them', text: 'Can you review the spacing in feed?', time: '10:11 PM' },
			{ id: 'm-2', sender: 'me', text: 'Yep, I will check it now.', time: '10:12 PM' },
			{ id: 'm-3', sender: 'them', text: 'I pushed the latest UI polish for cards.', time: '10:13 PM' },
		],
	},
	{
		id: 'chat-2',
		username: 'alex_pm',
		lastMessage: 'Tomorrow we can ship the chat UI draft.',
		lastMessageAt: '8m',
		unreadCount: 0,
		messages: [
			{ id: 'm-4', sender: 'them', text: 'How far are we with chat?', time: '9:48 PM' },
			{ id: 'm-5', sender: 'me', text: 'Dropdown and widget are nearly done.', time: '9:53 PM' },
			{ id: 'm-6', sender: 'them', text: 'Tomorrow we can ship the chat UI draft.', time: '9:54 PM' },
		],
	},
	{
		id: 'chat-3',
		username: 'mariam_art',
		lastMessage: 'New profile icons are uploaded.',
		lastMessageAt: '15m',
		unreadCount: 1,
		messages: [
			{ id: 'm-7', sender: 'them', text: 'Do you want rounded or sharp icons?', time: '9:31 PM' },
			{ id: 'm-8', sender: 'me', text: 'Rounded fits our current style.', time: '9:32 PM' },
			{ id: 'm-9', sender: 'them', text: 'New profile icons are uploaded.', time: '9:39 PM' },
		],
	},
	{
		id: 'chat-4',
		username: 'nika_qa',
		lastMessage: 'Found one small overlap on mobile navbar.',
		lastMessageAt: '22m',
		unreadCount: 0,
		messages: [
			{ id: 'm-10', sender: 'them', text: 'Testing feed page now.', time: '9:18 PM' },
			{ id: 'm-11', sender: 'them', text: 'Found one small overlap on mobile navbar.', time: '9:24 PM' },
		],
	},
	{
		id: 'chat-5',
		username: 'giorgi_data',
		lastMessage: 'Mock analytics screenshot attached.',
		lastMessageAt: '36m',
		unreadCount: 0,
		messages: [
			{ id: 'm-12', sender: 'me', text: 'Can you share sample metrics?', time: '8:57 PM' },
			{ id: 'm-13', sender: 'them', text: 'Mock analytics screenshot attached.', time: '9:10 PM' },
		],
	},
	{
		id: 'chat-6',
		username: 'saba_ops',
		lastMessage: 'Server restart is scheduled at midnight.',
		lastMessageAt: '1h',
		unreadCount: 3,
		messages: [
			{ id: 'm-14', sender: 'them', text: 'Server restart is scheduled at midnight.', time: '8:36 PM' },
		],
	},
	{
		id: 'chat-7',
		username: 'luka_front',
		lastMessage: 'Let us align card shadow values tomorrow.',
		lastMessageAt: '2h',
		unreadCount: 0,
		messages: [
			{ id: 'm-15', sender: 'them', text: 'Let us align card shadow values tomorrow.', time: '7:41 PM' },
		],
	},
];
