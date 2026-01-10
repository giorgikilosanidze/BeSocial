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
	user: { id: string; username: string };
	isLoggedIn: boolean;
	isLoading: boolean;
	error: string;
}

export interface AuthResponse {
	id: string;
	username: string;
}
