import { fetchProfileInfo } from '@/features/profile/profileThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileTabs from '@/components/ProfileTabs';
import ProfileIntro from '@/components/ProfileIntro';
import ProfilePhotos from '@/components/ProfilePhotos';
import ProfileFriends from '@/components/ProfileFriends';
import ProfileCreatePost from '@/components/ProfileCreatePost';
import ProfilePostsFilter from '@/components/ProfilePostsFilter';
import PostCard from '@/components/PostCard';

const Profile = () => {
	const { userId } = useParams<{ userId: string }>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchProfileInfo(userId));
	}, [userId, dispatch]);

	// Sample posts data - replace with actual data from Redux store
	const samplePosts = [
		{
			id: '1',
			author: {
				_id: '123',
				username: 'John Doe',
			},
			text: "Just finished building an amazing feature for our new project! 🚀 Really excited about the tech stack we're using - React, TypeScript, and Node.js are such a powerful combination. Can't wait to share more details soon! 💻 #coding #webdev #typescript",
			imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
			createdAt: new Date().toISOString(),
			updatedAt: '22333',
			isEdited: false,
			isLiked: false,
			comments: 38,
		},
		{
			id: '2',
			author: {
				_id: '123',
				username: 'John Doe',
			},
			text: 'Anyone else feel like TypeScript has completely changed the way they write JavaScript? The type safety and developer experience are just unmatched. Would love to hear your thoughts! 🤔',
			imageUrl: '',
			createdAt: '11111',
			updatedAt: '22333',
			isEdited: false,
			isLiked: false,
			comments: 52,
		},
		{
			id: '3',
			author: {
				_id: '123',
				username: 'John Doe',
			},
			text: 'Great article on modern web development! 📚',
			imageUrl: '',
			createdAt: '22222',
			updatedAt: '22333',
			isEdited: false,
			isLiked: false,
			comments: 24,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			{/* Main Container */}
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{/* Profile Header */}
				<ProfileHeader />

				{/* Tabs Navigation */}
				<ProfileTabs />

				{/* Main Content Area */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
					{/* Left Sidebar - About/Info */}
					<div className="lg:col-span-1 space-y-6">
						<ProfileIntro />
						<ProfilePhotos />
						<ProfileFriends />
					</div>

					{/* Right Content - Posts/Timeline */}
					<div className="lg:col-span-2 space-y-6">
						{/* Create Post (shown only on own profile) */}
						<ProfileCreatePost />

						{/* Posts Filter */}
						<ProfilePostsFilter />

						{/* Posts */}
						{samplePosts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
