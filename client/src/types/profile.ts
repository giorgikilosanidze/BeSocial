import type { FetchPostsResponse } from './feed';

export interface UserSliceState {
	user: UserProfile;
	isLoading: boolean;
	error: string;
}

export interface UserProfile {
	id: string;
	username: string;
	email: string;
	postsCount: number;
	posts: FetchPostsResponse;
}
