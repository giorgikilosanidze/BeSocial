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
	author: string;
	text: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}
