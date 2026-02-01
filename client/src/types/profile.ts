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
	profilePictureUrl?: string;
	coverPhotoUrl?: string;
}

export interface UploadPicturesData {
	userId: string;
	formData: FormData;
}

export interface ProfilePictureReturnData {
	profilePictureUrl: string;
}

export interface CoverPhotoReturnData {
	coverPhotoUrl: string;
}
