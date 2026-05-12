import Chat from './chat.model.js';
import User from '../user/user.model.js';
import { ChatModel, ChatThread } from './chat.types.js';

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
		.select('_id username profilePictureUrl')
		.lean();

	const usersById = new Map(
		partnerUsers.map((user: any) => [
			user._id.toString(),
			{
				username: user.username,
				avatarUrl: user.profilePictureUrl || '',
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
		};
	});
}
