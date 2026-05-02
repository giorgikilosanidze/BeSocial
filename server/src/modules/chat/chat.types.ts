export interface ChatModel {
	senderId: string;
	receiverId: string;
	text: string;
	seenAt: Date | null;
}

export interface PostChatRequest {
	userId?: string;
	body: {
		receiverId: string;
		text: string;
	};
}

export interface GetChatRequest {
	userId?: string;
	params: {
		receiverId?: string;
	};
}
