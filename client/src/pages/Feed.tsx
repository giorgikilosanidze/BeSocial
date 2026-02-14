import Navbar from '@/components/Navbar';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import ProfileSidebar from '@/components/ProfileSidebar';
import SuggestionsSidebar from '@/components/SuggestionsSidebar';
import PostSkeleton from '@/skeletons/PostSkeleton';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchPosts } from '@/features/feed/feedThunks';
import { socket } from '@/socket';
import {
	addPostInRealTime,
	addReactionInRealTime,
	deletePostInRealTime,
	editPostInRealTime,
} from '@/features/feed/feedSlice';
import type { CreatePostResponse, EditPostData } from '@/types/feed';

const Feed = () => {
	const { posts, isLoading } = useAppSelector((state) => state.feed);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	useEffect(() => {
		socket.on('reactionAdded', (reactionData) => {
			console.log(reactionData);

			dispatch(addReactionInRealTime(reactionData));
		});

		return () => {
			socket.off();
		};
	}, [dispatch]);

	useEffect(() => {
		socket.on('newPost', (post: CreatePostResponse) => {
			dispatch(addPostInRealTime(post));
		});

		return () => {
			socket.off('newPost');
		};
	}, [dispatch]);

	useEffect(() => {
		socket.on('postEdited', (editedPost: EditPostData) => {
			dispatch(editPostInRealTime(editedPost));
		});

		return () => {
			socket.off('postEdited');
		};
	}, [dispatch]);

	useEffect(() => {
		socket.on('postDeleted', (postId: string) => {
			dispatch(deletePostInRealTime(postId));
		});

		return () => {
			socket.off('postDeleted');
		};
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
							{isLoading ? (
								<>
									<PostSkeleton />
									<PostSkeleton />
									<PostSkeleton />
								</>
							) : (
								posts.map((post) => <PostCard key={post.id} post={post} />)
							)}
						</div>
					</main>

					<SuggestionsSidebar />
				</div>
			</div>
		</div>
	);
};

export default Feed;
