export interface ChatModel {
	senderId: string;
	recieverId: string;
	text: string;
	seenAt: Date | null;
}

export interface PostChatRequest {
	userId?: string;
	body: {
		recieverId: string;
		text: string;
	};
}
