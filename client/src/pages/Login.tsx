const Login = () => {
	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			{/* Login Card */}
			<div className="relative w-full max-w-md">
				{/* Glassmorphic card */}
				<div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 transform transition-all duration-500 hover:scale-[1.02]">
					{/* Logo/Brand Section */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/30 mb-4 shadow-lg">
							<svg
								className="w-8 h-8 text-white"
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
						<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
							Welcome To BeSocial
						</h1>
						<p className="text-white/80 text-sm md:text-base">
							Sign in to continue to BeSocial
						</p>
					</div>

					{/* Login Form */}
					<form className="space-y-5">
						{/* Email Input */}
						<div className="group">
							<label
								htmlFor="email"
								className="block text-white/90 text-sm font-medium mb-2 ml-1"
							>
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors"
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
									className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
									placeholder="you@example.com"
								/>
							</div>
						</div>

						{/* Password Input */}
						<div className="group">
							<label
								htmlFor="password"
								className="block text-white/90 text-sm font-medium mb-2 ml-1"
							>
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-white/50 group-focus-within:text-white/80 transition-colors"
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
									className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
									placeholder="••••••••"
								/>
							</div>
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between text-sm">
							<a
								href="#"
								className="text-white/80 hover:text-white transition-colors font-medium"
							>
								Forgot password?
							</a>
						</div>

						{/* Sign In Button */}
						<button
							type="submit"
							className="w-full bg-white text-purple-600 font-semibold py-3.5 rounded-xl hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
						>
							Sign In
						</button>
					</form>

					{/* Sign Up Link */}
					<div className="mt-8 text-center">
						<p className="text-white/80 text-sm">
							Don't have an account?{' '}
							<a
								href="#"
								className="text-white font-semibold hover:underline transition-all"
							>
								Sign up
							</a>
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

export default Login;
