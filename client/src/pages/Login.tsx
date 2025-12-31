import routes from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

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
							<input
								type="password"
								id="password"
								className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								placeholder="••••••••"
							/>
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
