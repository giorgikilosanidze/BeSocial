import type { LoginValidation, SignupValidation } from './validation';

export interface UserSignup {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface AuthSliceState {
	user: AuthResponse;
	isLoggedIn: boolean;
	isLoading: boolean;
	error: string;
	loginValidationErrors: LoginValidation;
	signupValidationErrors: SignupValidation;
}

export interface AuthResponse {
	id: string;
	username: string;
	email: string;
	postsCount: number;
	profilePictureUrl?: string;
	coverPhotoUrl?: string;
	followersCount: number;
	followingCount: number;
	following: [];
	followers: [];
}

export type LoginError = {
	message: string;
	otherErrors?: { email?: string; password?: string };
	errors?: {
		properties?: {
			email?: { errors?: string[] };
			password?: { errors?: string[] };
		};
	};
};

export type SignupError = {
	message: string;
	otherErrors?: { email?: string; confirmPassword?: string };
	errors?: {
		properties?: {
			username?: { errors?: string[] };
			email?: { errors?: string[] };
			password?: { errors?: string[] };
			confirmPassword?: { errors?: string[] };
		};
	};
};
