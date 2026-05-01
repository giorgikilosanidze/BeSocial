import dummyProfilePicture from '@/assets/user.jpg';

export const chatUiData = [
	{
		id: '1',
		username: 'Luffy',
		avatarUrl: dummyProfilePicture,
		lastMessage: 'Are we still meeting at the dock?',
		lastMessageAt: '2m',
		unreadCount: 2,
		messages: [
			{ id: '1-1', sender: 'them' as const, text: 'Hey!', time: '11:02' },
			{
				id: '1-2',
				sender: 'them' as const,
				text: 'Are we still meeting at the dock?',
				time: '11:03',
			},
		],
	},
	{
		id: '2',
		username: 'Nami',
		avatarUrl: dummyProfilePicture,
		lastMessage: 'Bring the map with you.',
		lastMessageAt: '15m',
		unreadCount: 0,
		messages: [
			{ id: '2-1', sender: 'me' as const, text: 'On my way.', time: '10:20' },
			{ id: '2-2', sender: 'them' as const, text: 'Bring the map with you.', time: '10:21' },
		],
	},
	{
		id: '3',
		username: 'Zoro',
		avatarUrl: dummyProfilePicture,
		lastMessage: 'Training starts at 6.',
		lastMessageAt: '1h',
		unreadCount: 1,
		messages: [
			{ id: '3-1', sender: 'them' as const, text: 'Training starts at 6.', time: '09:00' },
		],
	},
	{
		id: '4',
		username: 'Sanji',
		avatarUrl: dummyProfilePicture,
		lastMessage: 'Dinner is ready.',
		lastMessageAt: '3h',
		unreadCount: 0,
		messages: [{ id: '4-1', sender: 'them' as const, text: 'Dinner is ready.', time: '07:10' }],
	},
	{
		id: '5',
		username: 'Robin',
		avatarUrl: dummyProfilePicture,
		lastMessage: 'Found a new book for you.',
		lastMessageAt: 'Yesterday',
		unreadCount: 0,
		messages: [
			{
				id: '5-1',
				sender: 'them' as const,
				text: 'Found a new book for you.',
				time: 'Yesterday',
			},
		],
	},
	{
		id: '6',
		username: 'Franky',
		avatarUrl: dummyProfilePicture,
		lastMessage: 'The ship upgrade is done.',
		lastMessageAt: 'Yesterday',
		unreadCount: 0,
		messages: [
			{
				id: '6-1',
				sender: 'them' as const,
				text: 'The ship upgrade is done.',
				time: 'Yesterday',
			},
		],
	},
];
