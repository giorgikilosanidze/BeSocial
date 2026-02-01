import SERVER_URL from '@/constants/serverUrl';
import type {
	CoverPhotoReturnData,
	ProfilePictureReturnData,
	UploadPicturesData,
	UserProfile,
} from '@/types/profile';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfileInfo = createAsyncThunk<UserProfile, string>(
	'profile/fetchProfileInfo',
	async (userId, { rejectWithValue }) => {
		const response = await fetch(`${SERVER_URL}/api/profile/user/${userId}`, {
			credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
			if (data.message === 'ACCESS_TOKEN_EXPIRED' || data.message === 'NO_ACCESS_TOKEN') {
				try {
					await refreshTokenRequest();

					const retry = await fetch(`${SERVER_URL}/api/profile/user/${userId}`, {
						credentials: 'include',
					});

					if (!retry.ok) {
						const retryError = await retry.json();
						return rejectWithValue(retryError.message || 'Not authenticated');
					}

					const retryRes = await retry.json();
					return retryRes;
				} catch (refreshError: unknown) {
					return rejectWithValue((refreshError as Error).message);
				}
			}

			return rejectWithValue(data.message || 'Not authenticated');
		}

		return data;
	},
);

export const uploadProfilePicture = createAsyncThunk<ProfilePictureReturnData, UploadPicturesData>(
	'profile/uploadProfilePicture',
	async (data, { rejectWithValue }) => {
		const response = await fetch(`${SERVER_URL}/api/profile/profilePicture/${data.userId}`, {
			method: 'POST',
			body: data.formData,
			credentials: 'include',
		});

		const res = await response.json();

		if (!response.ok) {
			rejectWithValue({ res });
		}

		return res;
	},
);

export const uploadCoverPhoto = createAsyncThunk<CoverPhotoReturnData, UploadPicturesData>(
	'profile/uploadCoverPhoto',
	async (data, { rejectWithValue }) => {
		const response = await fetch(`${SERVER_URL}/api/profile/coverPhoto/${data.userId}`, {
			method: 'POST',
			body: data.formData,
			credentials: 'include',
		});

		const res = await response.json();

		if (!response.ok) {
			rejectWithValue({ res });
		}

		return res;
	},
);
