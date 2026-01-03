import routes from '@/constants/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const handleSignUpClick = () => {
		navigate(routes.signup);
	};

	return (
		<div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
			{/* Login Card */}
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
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							BeSocial
						</h1>
						<p className="text-gray-600 text-sm">
							Sign in to connect with friends
						</p>
					</div>

					{/* Login Form */}
					<form className="space-y-4">
						{/* Email Input */}
						<div>
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-medium mb-2"
							>
								Email Address
							</label>
							<input
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
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
							placeholder="••••••••"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
						>
							{showPassword ? (
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/>
								</svg>
							) : (
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>

						{/* Forgot Password */}
						<div className="flex items-center justify-end">
							<a
								href="#"
								className="text-sm text-blue-600 hover:text-blue-700 font-medium"
							>
								Forgot password?
							</a>
						</div>

						{/* Sign In Button */}
						<button
							type="submit"
							className="w-full bg-blue-600 text-white font-semibold py-3 text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
						>
							Sign In
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

					{/* Sign Up Link */}
					<div className="text-center">
						<p className="text-gray-600 text-sm">
							Don't have an account?{' '}
							<span
								onClick={handleSignUpClick}
								className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors"
							>
								Sign up
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
