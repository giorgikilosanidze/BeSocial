const ProfileIntro = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Intro
			</h3>
			<div className="space-y-3">
				<div className="flex items-start space-x-3 text-sm">
					<svg
						className="w-5 h-5 text-gray-500 mt-0.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					<div>
						<p className="text-gray-700 font-medium">
							Software Engineer
						</p>
						<p className="text-gray-500 text-xs">at TechCorp Inc.</p>
					</div>
				</div>
				<div className="flex items-start space-x-3 text-sm">
					<svg
						className="w-5 h-5 text-gray-500 mt-0.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 14l9-5-9-5-9 5 9 5z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
						/>
					</svg>
					<div>
						<p className="text-gray-700 font-medium">
							Stanford University
						</p>
						<p className="text-gray-500 text-xs">
							Computer Science
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-3 text-sm">
					<svg
						className="w-5 h-5 text-gray-500 mt-0.5"
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
					<div>
						<p className="text-gray-700 font-medium">
							Lives in
							<span className="font-normal"> San Francisco, CA</span>
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-3 text-sm">
					<svg
						className="w-5 h-5 text-gray-500 mt-0.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<div>
						<p className="text-gray-700 font-medium">
							From
							<span className="font-normal"> New York, NY</span>
						</p>
					</div>
				</div>
				<div className="flex items-start space-x-3 text-sm">
					<svg
						className="w-5 h-5 text-gray-500 mt-0.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					<div>
						<p className="text-gray-700 font-medium">Single</p>
					</div>
				</div>
			</div>
			<button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
				Edit Details
			</button>
		</div>
	);
};

export default ProfileIntro;
