import routes from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate(routes.login);
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Signup Card */}
			<div className="relative w-full max-w-md">
				{/* Glassmorphic card */}
				<div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 transform transition-all duration-500">
					{/* Logo/Brand Section */}
					<div className="text-center mb-6">
						<div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl backdrop-blur-sm border border-white/30 mb-3 shadow-lg">
							<svg
								className="w-6 h-6 text-white"
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
						<h1 className="text-2xl md:text-3xl font-bold text-white mb-1.5">
							Join BeSocial
						</h1>
						<p className="text-white/80 text-xs md:text-sm">
							Create your account to get started
						</p>
					</div>

					{/* Signup Form */}
					<form className="flex flex-col gap-4">
						{/* Username Input */}
						<div className="group">
							<label
								htmlFor="username"
								className="block text-white/90 text-xs font-medium mb-1.5 ml-1"
							>
								Username
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-4 h-4 text-white/50 group-focus-within:text-white/80 transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<input
									type="text"
									id="username"
									className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/50 rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
									placeholder="Johndoe123"
								/>
							</div>
						</div>

						{/* Email Input */}
						<div className="group">
							<label
								htmlFor="email"
								className="block text-white/90 text-xs font-medium mb-1.5 ml-1"
							>
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-4 h-4 text-white/50 group-focus-within:text-white/80 transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
								<input
									type="email"
									id="email"
									className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/50 rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
									placeholder="you@example.com"
								/>
							</div>
						</div>

						{/* Password Input */}
						<div className="group">
							<label
								htmlFor="password"
								className="block text-white/90 text-xs font-medium mb-1.5 ml-1"
							>
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-4 h-4 text-white/50 group-focus-within:text-white/80 transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<input
									type="password"
									id="password"
									className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/50 rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
									placeholder="••••••••"
								/>
							</div>
						</div>

						{/* Confirm Password Input */}
						<div className="group">
							<label
								htmlFor="confirmPassword"
								className="block text-white/90 text-xs font-medium mb-1.5 ml-1"
							>
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-4 h-4 text-white/50 group-focus-within:text-white/80 transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<input
									type="password"
									id="confirmPassword"
									className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/50 rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
									placeholder="••••••••"
								/>
							</div>
						</div>

						{/* Sign Up Button */}
						<button
							type="submit"
							className="w-full mt-3 bg-white text-purple-600 font-semibold py-2.5 text-sm rounded-xl hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
						>
							Create Account
						</button>
					</form>

					{/* Login Link */}
					<div className="mt-6 text-center">
						<p className="text-white/80 text-sm">
							Already have an account?{' '}
							<span
								onClick={handleLoginClick}
								className="text-white font-semibold cursor-pointer hover:underline transition-all"
							>
								Sign in
							</span>
						</p>
					</div>
				</div>

				{/* Decorative elements */}
				<div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl"></div>
				<div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
			</div>
		</div>
	);
};

export default Signup;
