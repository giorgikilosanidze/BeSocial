import { Link } from 'react-router-dom';
import routes from '@/constants/routes';

const NotFound = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<div className="text-center max-w-lg mx-auto">
				<div className="mb-8 flex justify-center">
					<div className="relative">
						<div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
							<svg
								className="w-16 h-16 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
							<svg
								className="w-8 h-8 text-red-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				<h1 className="text-6xl font-extrabold text-blue-600 mb-4 tracking-tight">404</h1>
				<h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
				<p className="text-gray-500 mb-8 text-lg">
					Oops! It looks like you've wandered off the beaten path. The page you're looking
					for search doesn't exist or has been moved.
				</p>

				<Link
					to={routes.feed}
					className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					Back to Feed
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
