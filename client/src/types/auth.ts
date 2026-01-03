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
	isLoggedIn: boolean;
	jwt: null | string;
	isLoading: boolean;
	error: string;
}
