export interface LoginValidation {
	email: string;
	password: string;
}

export type SignupValidation = LoginValidation & { username: string; confirmPassword: string };
