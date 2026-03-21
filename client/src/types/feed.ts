export interface FeedSliceState {
	posts: CreatePostResponse[];
	isLoading: boolean;
	error: string;
	followersCount: number;
	followingsCount: number;
	suggestions: Suggestions;
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
	likes: number;
	loves: number;
	angry: number;
	userReaction?: ReactionTypes | null;
	comments?: Comments[];
}

export interface Comments {
	_id: string;
	postId: string;
	userId: string;
	username: string;
	text: string;
	createdAt: string;
	profilePictureUrl?: string;
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
	reactions: {
		likes: number;
		loves: number;
		angry: number;
	};
}

export type ReactionTypes = 'like' | 'love' | 'angry';

export interface CommentData {
	text: string;
	postId: string;
}

export interface DeleteCommentPayload {
	postId: string;
	commentId: string;
}

export interface DeleteCommentResponse {
	postId: string;
	commentId: string;
}

export type Suggestions = {
	_id: string;
	profilePictureUrl: string;
	username: string;
}[];
