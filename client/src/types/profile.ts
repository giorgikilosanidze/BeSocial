import type { FetchPostsResponse } from './feed';

export interface UserSliceState {
	user: UserProfile;
	isLoading: boolean;
	isPostsLoading: boolean;
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
	followersCount: number;
	followingCount: number;
	following: [];
	followers: [];
	isFollowed: boolean;
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

export interface FollowListUser {
	_id: string;
	username: string;
	profilePictureUrl: string;
	isFollowed: boolean;
}
