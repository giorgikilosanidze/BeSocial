import routes from '@/constants/routes';
import { signupUser } from '@/features/auth/authThunks';
import type { AppDispatch } from '@/store';
import type { UserSignup } from '@/types/auth';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const [user, setUser] = useState<UserSignup>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const handleLoginClick = () => {
		navigate(routes.login);
	};

	const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await dispatch(signupUser(user)).unwrap();
			navigate(routes.login);
		} catch (error) {
			console.error('Signup failed:', error);
		}
	};

	const handleUserCredentials = (credential: string, value: string) => {
		setUser((prev) => ({ ...prev, [credential]: value }));
	};

	return (
		<div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
			{/* Signup Card */}
			<div className="w-full max-w-md">
				{/* Card */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
					{/* Logo/Brand Section */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4">
							<svg
								className="w-7 h-7 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
								/>
							</svg>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">BeSocial</h1>
						<p className="text-gray-600 text-sm">Create your account to get started</p>
					</div>

					{/* Signup Form */}
					<form
						onSubmit={(e: FormEvent<HTMLFormElement>) => handleSignUp(e)}
						className="space-y-4"
					>
						{/* Username Input */}
						<div>
							<label
								htmlFor="username"
								className="block text-gray-700 text-sm font-medium mb-2"
							>
								Username
							</label>
							<input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									handleUserCredentials('username', e.target.value)
								}
								value={user.username}
								type="text"
								id="username"
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								placeholder="johndoe123"
							/>
						</div>

						{/* Email Input */}
						<div>
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-medium mb-2"
							>
								Email Address
							</label>
							<input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									handleUserCredentials('email', e.target.value)
								}
								value={user.email}
								type="email"
								id="email"
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								placeholder="you@example.com"
							/>
						</div>

						{/* Password Input */}
						<div>
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-medium mb-2"
							>
								Password
							</label>
							<input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									handleUserCredentials('password', e.target.value)
								}
								value={user.password}
								type="password"
								id="password"
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								placeholder="••••••••"
							/>
						</div>

						{/* Confirm Password Input */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-gray-700 text-sm font-medium mb-2"
							>
								Confirm Password
							</label>
							<input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									handleUserCredentials('confirmPassword', e.target.value)
								}
								value={user.confirmPassword}
								type="password"
								id="confirmPassword"
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								placeholder="••••••••"
							/>
						</div>

						{/* Sign Up Button */}
						<button
							type="submit"
							className="w-full bg-blue-600 text-white font-semibold py-3 text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all mt-2"
						>
							Create Account
						</button>
					</form>

					{/* Divider */}
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">or</span>
						</div>
					</div>

					{/* Login Link */}
					<div className="text-center">
						<p className="text-gray-600 text-sm">
							Already have an account?{' '}
							<span
								onClick={handleLoginClick}
								className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors"
							>
								Sign in
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
