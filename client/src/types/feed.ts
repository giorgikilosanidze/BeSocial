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
	text: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export type FetchPostsResponse = CreatePostResponse[];

export interface PostCardProps {
	post: {
		id: string;
		author: {
			username: string;
			_id: string;
		};
		createdAt: string;
		text: string;
		updatedAt?: string;
		imageUrl?: string;
		likes?: number;
		loves?: number;
		comments?: number;
		isLiked?: boolean;
	};
}
