export interface FeedSliceState {
	posts: CreatePostResponse[];
	isLoading: boolean;
	error: string;
	followersCount: number;
	followingsCount: number;
}

export interface Post {
	text: string;
	image?: File;
}

export interface CreatePostResponse {
	author: {
		username: string;
		_id: string;
		profilePictureUrl?: string;
	};
	isEdited: boolean;
	text: string;
	createdAt: string;
	updatedAt: string;
	id: string;
	imageUrls?: string[];
	userReaction?: ReactionTypes | null;
	comments?: number;
}

export type FetchPostsResponse = CreatePostResponse[];

export interface PostCardProps {
	post: CreatePostResponse;
}

export interface EditPostData {
	postId: string;
	post: {
		text?: string;
		imageUrls?: string[];
	};
}

export interface EditPostResponse {
	postId: string;
	text?: string;
	imageUrls?: string[];
}

export interface DeletePostResponse {
	postId: string;
}

export interface ReactionsState {
	reactions: [];
	isLoading: boolean;
	error: string;
}

export interface ReactionData {
	postId: string;
	userId: string;
	reactionType: ReactionTypes;
}

export interface SocketReactionData {
	postId: string;
	userId: string;
	userReaction: ReactionTypes;
}

export type ReactionTypes = 'like' | 'love' | 'angry';
