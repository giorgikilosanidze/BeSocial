export const OPEN_CHAT_FROM_PROFILE_EVENT = 'chat:open-from-profile';

export interface OpenChatFromProfilePayload {
	userId: string;
	username: string;
	avatarUrl?: string;
}

export const openChatFromProfile = (payload: OpenChatFromProfilePayload) => {
	window.dispatchEvent(new CustomEvent<OpenChatFromProfilePayload>(OPEN_CHAT_FROM_PROFILE_EVENT, {
		detail: payload,
	}));
};
