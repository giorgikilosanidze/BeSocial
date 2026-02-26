import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import ProfileSidebar from '@/components/ProfileSidebar';
import SuggestionsSidebar from '@/components/SuggestionsSidebar';
import PostSkeleton from '@/skeletons/PostSkeleton';
import type { CreatePostResponse as PostType } from '@/types/feed';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SERVER_URL from '@/constants/serverUrl';
import { refreshTokenRequest } from '@/utils/refreshTokenRequest';

const Post = () => {
	const { postId } = useParams<{ postId: string }>();
	const [post, setPost] = useState<PostType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setIsLoading(true);
				let response = await fetch(`${SERVER_URL}/api/feed/posts/${postId}`, {
					credentials: 'include',
				});

				if (!response.ok) {
					const errorData = await response.json();
					if (
						errorData.message === 'ACCESS_TOKEN_EXPIRED' ||
						errorData.message === 'NO_ACCESS_TOKEN'
					) {
						await refreshTokenRequest();
						response = await fetch(`${SERVER_URL}/api/feed/posts/${postId}`, {
							credentials: 'include',
						});
					}

					if (!response.ok) {
						throw new Error('Failed to fetch post');
					}
				}

				const data = await response.json();
				setPost(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message || 'Something went wrong');
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (postId) {
			fetchPost();
		}
	}, [postId]);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Navbar />

			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<ProfileSidebar />
					<div className="lg:col-span-6 space-y-6">
						{isLoading && (
							<div>
								<PostSkeleton />
							</div>
						)}

						{error && (
							<div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center mt-8">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
									<svg
										className="w-6 h-6 text-red-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Post NotFound
								</h3>
								<p className="text-gray-500">{error}</p>
							</div>
						)}

						{!isLoading && !error && post && (
							<div>
								<PostCard post={post} />
							</div>
						)}
					</div>
					<SuggestionsSidebar />
				</div>
			</main>
		</div>
	);
};

export default Post;
