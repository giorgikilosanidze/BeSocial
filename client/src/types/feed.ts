export interface FeedSliceState {
	posts: [];
	isLoading: boolean;
	error: string;
}

export interface Post {
	text: string;
	image?: File;
}

export interface CreatePostResponse {
	user: { id: string };
	post: { text: string };
}
