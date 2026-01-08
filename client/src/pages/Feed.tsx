import Navbar from '@/components/Navbar';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import ProfileSidebar from '@/components/ProfileSidebar';
import SuggestionsSidebar from '@/components/SuggestionsSidebar';

const Feed = () => {
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

						{/* Posts Feed - Multiple PostCard components for demo */}
						<div className="space-y-6">
							<PostCard />
							<PostCard />
							<PostCard />
						</div>
					</main>

					<SuggestionsSidebar />
				</div>
			</div>
		</div>
	);
};

export default Feed;
