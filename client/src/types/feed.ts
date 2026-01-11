export interface FeedSliceState {
	posts: CreatePostResponse[];
	isLoading: boolean;
	error: string;
}

export interface Post {
	text: string;
	image?: File;
}

export interface CreatePostResponse {
	author: {
		username: string;
		_id: string;
	};
	isEdited: boolean;
	text: string;
	createdAt: string;
	updatedAt: string;
	id: string;
	imageUrl?: string;
	likes?: number;
	loves?: number;
	comments?: number;
	isLiked?: boolean;
}

export type FetchPostsResponse = CreatePostResponse[];

export interface PostCardProps {
	post: CreatePostResponse;
}

export interface EditPostData {
	postId: string;
	post: {
		text?: string;
		imageUrl?: string;
	};
}

export interface EditPostResponse {
	postId: string;
	text?: string;
	imageUrl?: string;
}
