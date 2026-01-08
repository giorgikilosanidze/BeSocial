import { useAppSelector } from '@/hooks/reduxHooks';
import { useState } from 'react';

const Feed = () => {
	const user = useAppSelector((state) => state.auth.user);
	const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
	const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);

	// Sample data for UI demonstration
	const demoUser = {
		name: user?.username || 'User',
		avatar: 'https://ui-avatars.com/api/?name=' + (user?.username || 'User') + '&background=2563eb&color=fff',
	};

	const demoPosts = [
		{
			id: 1,
			author: 'Sarah Johnson',
			avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563eb&color=fff',
			time: '2 hours ago',
			content: 'Just finished an amazing project! The journey was challenging but incredibly rewarding. Grateful for all the support from this amazing community! 🚀',
			image: null,
			likes: 124,
			loves: 45,
			comments: 12,
			isLiked: false,
			isLoved: false,
		},
		{
			id: 2,
			author: 'Michael Chen',
			avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=059669&color=fff',
			time: '5 hours ago',
			content: 'Beautiful sunset at the beach today 🌅',
			image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
			likes: 342,
			loves: 89,
			comments: 28,
			isLiked: true,
			isLoved: false,
		},
		{
			id: 3,
			author: 'Emma Wilson',
			avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=7c3aed&color=fff',
			time: '1 day ago',
			content: 'New blog post is live! Check out my thoughts on modern web development and the future of React. Link in bio! 💻',
			image: null,
			likes: 256,
			loves: 67,
			comments: 45,
			isLiked: false,
			isLoved: true,
		},
	];

	const suggestions = [
		{ name: 'Alex Turner', mutual: 12, avatar: 'https://ui-avatars.com/api/?name=Alex+Turner&background=dc2626&color=fff' },
		{ name: 'Sophie Miller', mutual: 8, avatar: 'https://ui-avatars.com/api/?name=Sophie+Miller&background=ea580c&color=fff' },
		{ name: 'David Lee', mutual: 15, avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=0891b2&color=fff' },
	];

	const handleCommentChange = (postId: number, value: string) => {
		setCommentInputs(prev => ({ ...prev, [postId]: value }));
	};

	const toggleCommentSection = (postId: number) => {
		setActiveCommentSection(activeCommentSection === postId ? null : postId);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation Bar */}
			<nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex items-center space-x-2">
							<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<span className="text-xl font-bold text-gray-900">BeSocial</span>
						</div>

						{/* Search Bar */}
						<div className="hidden md:flex flex-1 max-w-md mx-8">
							<div className="relative w-full">
								<input
									type="text"
									placeholder="Search BeSocial..."
									className="w-full bg-gray-100 border-0 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
								/>
								<svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
						</div>

						{/* Right Icons */}
						<div className="flex items-center space-x-4">
							<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
								<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
								</svg>
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
								<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
								</svg>
								<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
								<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
								</svg>
							</button>
							<div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-600 cursor-pointer">
								<img src={demoUser.avatar} alt="Profile" className="w-full h-full object-cover" />
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					{/* Left Sidebar - User Profile (Hidden on mobile) */}
					<aside className="hidden lg:block lg:col-span-3">
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-20">
							<div className="h-20 bg-gradient-to-r from-blue-500 to-blue-600"></div>
							<div className="px-4 pb-4">
								<div className="flex flex-col items-center -mt-10">
									<div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
										<img src={demoUser.avatar} alt="Profile" className="w-full h-full object-cover" />
									</div>
									<h3 className="mt-2 text-lg font-semibold text-gray-900">{demoUser.name}</h3>
									<p className="text-sm text-gray-500">@{demoUser.name.toLowerCase().replace(' ', '')}</p>
								</div>
								<div className="mt-4 pt-4 border-t border-gray-200">
									<div className="flex justify-around text-center">
										<div>
											<p className="text-lg font-bold text-gray-900">245</p>
											<p className="text-xs text-gray-500">Posts</p>
										</div>
										<div>
											<p className="text-lg font-bold text-gray-900">1.2K</p>
											<p className="text-xs text-gray-500">Followers</p>
										</div>
										<div>
											<p className="text-lg font-bold text-gray-900">892</p>
											<p className="text-xs text-gray-500">Following</p>
										</div>
									</div>
								</div>
								<button className="w-full mt-4 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
									View Profile
								</button>
							</div>
						</div>
					</aside>

					{/* Main Feed */}
					<main className="lg:col-span-6">
						{/* Create Post Card */}
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
							<div className="flex space-x-3">
								<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
									<img src={demoUser.avatar} alt="Profile" className="w-full h-full object-cover" />
								</div>
								<div className="flex-1">
									<textarea
										rows={1}
										placeholder={`What's on your mind, ${demoUser.name.split(' ')[0]}?`}
										className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
										onFocus={(e) => {
											e.target.rows = 3;
											e.target.classList.remove('rounded-full');
											e.target.classList.add('rounded-lg');
										}}
										onBlur={(e) => {
											if (!e.target.value) {
												e.target.rows = 1;
												e.target.classList.remove('rounded-lg');
												e.target.classList.add('rounded-full');
											}
										}}
									></textarea>
								</div>
							</div>
							<div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-200">
								<div className="flex space-x-2">
									<button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
										<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										<span className="text-sm font-medium text-gray-700">Photo</span>
									</button>
									<button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
										<svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span className="text-sm font-medium text-gray-700">Feeling</span>
									</button>
								</div>
								<button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
									Post
								</button>
							</div>
						</div>

						{/* Posts Feed */}
						<div className="space-y-6">
							{demoPosts.map((post) => (
								<div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
									{/* Post Header */}
									<div className="p-4 flex items-start justify-between">
										<div className="flex space-x-3">
											<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
												<img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
											</div>
											<div>
												<h4 className="font-semibold text-gray-900 text-sm">{post.author}</h4>
												<p className="text-xs text-gray-500">{post.time}</p>
											</div>
										</div>
										<button className="text-gray-400 hover:text-gray-600 transition-colors">
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
											</svg>
										</button>
									</div>

									{/* Post Content */}
									<div className="px-4 pb-3">
										<p className="text-gray-800 text-sm leading-relaxed">{post.content}</p>
									</div>

									{/* Post Image */}
									{post.image && (
										<div className="w-full">
											<img src={post.image} alt="Post" className="w-full object-cover max-h-96" />
										</div>
									)}

									{/* Reactions Summary */}
									<div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
										<div className="flex items-center space-x-2">
											<div className="flex -space-x-1">
												<div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border border-white">
													<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
													</svg>
												</div>
												<div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-white">
													<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
													</svg>
												</div>
											</div>
											<span>{post.likes + post.loves}</span>
										</div>
										<div className="flex items-center space-x-4">
											<button 
												onClick={() => toggleCommentSection(post.id)}
												className="hover:underline"
											>
												{post.comments} comments
											</button>
											<span>12 shares</span>
										</div>
									</div>

									{/* Action Buttons */}
									<div className="px-4 py-2 flex items-center justify-around border-b border-gray-100">
										<button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${post.isLiked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
											<svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
											</svg>
											<span className="font-medium text-sm">Like</span>
										</button>
										<button 
											onClick={() => toggleCommentSection(post.id)}
											className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
											</svg>
											<span className="font-medium text-sm">Comment</span>
										</button>
										<button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
											</svg>
											<span className="font-medium text-sm">Share</span>
										</button>
									</div>

									{/* Comments Section */}
									{activeCommentSection === post.id && (
										<div className="px-4 py-3 bg-gray-50">
											<div className="space-y-3">
												{/* Sample Comments */}
												<div className="flex space-x-2">
													<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
														<img src="https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff" alt="Commenter" className="w-full h-full object-cover" />
													</div>
													<div className="flex-1">
														<div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
															<p className="font-semibold text-sm text-gray-900">John Doe</p>
															<p className="text-sm text-gray-700">Amazing post! Thanks for sharing 👍</p>
														</div>
														<div className="flex items-center space-x-4 mt-1 px-3">
															<button className="text-xs text-gray-500 hover:text-blue-600 font-medium">Like</button>
															<button className="text-xs text-gray-500 hover:text-blue-600 font-medium">Reply</button>
															<span className="text-xs text-gray-400">1h</span>
														</div>
													</div>
												</div>

												{/* Comment Input */}
												<div className="flex space-x-2 mt-3">
													<div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
														<img src={demoUser.avatar} alt="Your avatar" className="w-full h-full object-cover" />
													</div>
													<div className="flex-1 flex space-x-2">
														<input
															type="text"
															placeholder="Write a comment..."
															value={commentInputs[post.id] || ''}
															onChange={(e) => handleCommentChange(post.id, e.target.value)}
															className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
														/>
														<button className="text-blue-600 hover:text-blue-700 transition-colors">
															<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
																<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
															</svg>
														</button>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</main>

					{/* Right Sidebar - Suggestions */}
					<aside className="hidden lg:block lg:col-span-3">
						<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-semibold text-gray-900 text-sm">Suggestions For You</h3>
								<button className="text-xs text-blue-600 hover:text-blue-700 font-medium">See All</button>
							</div>
							<div className="space-y-3">
								{suggestions.map((suggestion, index) => (
									<div key={index} className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<div className="w-10 h-10 rounded-full overflow-hidden">
												<img src={suggestion.avatar} alt={suggestion.name} className="w-full h-full object-cover" />
											</div>
											<div>
												<p className="font-medium text-sm text-gray-900">{suggestion.name}</p>
												<p className="text-xs text-gray-500">{suggestion.mutual} mutual friends</p>
											</div>
										</div>
										<button className="text-blue-600 hover:text-blue-700 font-medium text-xs">
											Follow
										</button>
									</div>
								))}
							</div>

							{/* Trending Topics */}
							<div className="mt-6 pt-6 border-t border-gray-200">
								<h3 className="font-semibold text-gray-900 text-sm mb-4">Trending Topics</h3>
								<div className="space-y-3">
									<div className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
										<p className="font-medium text-sm text-gray-900">#WebDevelopment</p>
										<p className="text-xs text-gray-500">12.4K posts</p>
									</div>
									<div className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
										<p className="font-medium text-sm text-gray-900">#ReactJS</p>
										<p className="text-xs text-gray-500">8.9K posts</p>
									</div>
									<div className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
										<p className="font-medium text-sm text-gray-900">#TechNews</p>
										<p className="text-xs text-gray-500">15.2K posts</p>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
};

export default Feed;
