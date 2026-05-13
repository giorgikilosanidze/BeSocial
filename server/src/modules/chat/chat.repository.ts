import Chat from './chat.model.js';
import User from '../user/user.model.js';
import { ChatModel, ChatThread } from './chat.types.js';
import { isUserOnline } from '../../socket.js';

export async function storeMessage(
	userId: string,
	receiverId: string,
	text: string,
): Promise<ChatModel> {
	const chat = new Chat({
		senderId: userId,
		receiverId,
		text,
	});

	await chat.save();

	return chat;
}

export async function getChatMessages(userId: string, receiverId: string) {
	const messages = await Chat.find({
		$or: [
			{ senderId: userId, receiverId },
			{ senderId: receiverId, receiverId: userId },
		],
	}).sort({ createdAt: 1 });

	return messages;
}

export async function markMessagesAsSeen(userId: string, receiverId: string) {
	const unseenMessages = await Chat.find(
		{
			senderId: receiverId,
			receiverId: userId,
			seenAt: null,
		},
		{ _id: 1 },
	);

	if (unseenMessages.length === 0) {
		return { seenMessageIds: [] as string[], seenAt: null as string | null };
	}

	const seenAt = new Date();
	const seenMessageIds = unseenMessages.map((message) => message._id.toString());

	await Chat.updateMany(
		{
			_id: { $in: seenMessageIds },
		},
		{
			$set: { seenAt },
		},
	);

	return { seenMessageIds, seenAt: seenAt.toISOString() };
}

export async function getChatThreads(userId: string): Promise<ChatThread[]> {
	const chats = await Chat.find({
		$or: [{ senderId: userId }, { receiverId: userId }],
	}).sort({ createdAt: -1 });

	const latestByPartner = new Map<string, (typeof chats)[number]>();

	for (const chat of chats) {
		const partnerId = chat.senderId === userId ? chat.receiverId : chat.senderId;
		if (!latestByPartner.has(partnerId)) {
			latestByPartner.set(partnerId, chat);
		}
	}

	const partnerIds = Array.from(latestByPartner.keys());
	const partnerUsers = await User.find({ _id: { $in: partnerIds } })
		.select('_id username profilePictureUrl lastSeenAt')
		.lean();

	const usersById = new Map(
		partnerUsers.map((user: any) => [
			user._id.toString(),
			{
				username: user.username,
				avatarUrl: user.profilePictureUrl || '',
				lastSeenAt: user.lastSeenAt ? new Date(user.lastSeenAt).toISOString() : null,
			},
		]),
	);

	const unreadCounts = await Chat.aggregate([
		{
			$match: {
				receiverId: userId,
				seenAt: null,
			},
		},
		{
			$group: {
				_id: '$senderId',
				count: { $sum: 1 },
			},
		},
	]);

	const unreadBySender = new Map(
		unreadCounts.map((item: { _id: string; count: number }) => [item._id, item.count]),
	);

	return Array.from(latestByPartner.entries()).map(([partnerId, chat]) => {
		const partner = usersById.get(partnerId);
		const createdAt = (chat as any).createdAt as Date | undefined;

		return {
			id: partnerId,
			username: partner?.username || 'Unknown user',
			avatarUrl: partner?.avatarUrl || '',
			lastMessage: chat.text,
			lastMessageAt: createdAt?.toISOString() || '',
			unreadCount: unreadBySender.get(partnerId) || 0,
			isOnline: isUserOnline(partnerId),
			lastSeenAt: partner?.lastSeenAt || null,
		};
	});
}
