import Navbar from '@/components/Navbar';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import ProfileSidebar from '@/components/ProfileSidebar';
import SuggestionsSidebar from '@/components/SuggestionsSidebar';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchPosts } from '@/features/feed/feedThunks';

const Feed = () => {
	const posts = useAppSelector((state) => state.feed.posts);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<ProfileSidebar />

					{/* Main Feed */}
					<main className="lg:col-span-6">
						<CreatePost />

						<div className="space-y-6">
							{posts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
					</main>

					<SuggestionsSidebar />
				</div>
			</div>
		</div>
	);
};

export default Feed;
