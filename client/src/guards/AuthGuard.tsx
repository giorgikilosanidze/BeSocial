import routes from '@/constants/routes';
import { useAppSelector } from '@/hooks/reduxHooks';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

type AuthGuardProps = {
	children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const navigate = useNavigate();

	const handleLoginNavigate = () => {
		navigate(routes.login, { replace: true });
	};

	const handleSignupNavigate = () => {
		navigate(routes.signup, { replace: true });
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<PuffLoader color="#2563eb" />
			</div>
		);
	}

	if (!isLoggedIn) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/95 backdrop-blur-sm">
				<div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
					<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>

					<h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
					<p className="text-gray-500 mb-8">
						Please log in or create an account to view this content.
					</p>

					<div className="flex flex-col gap-3">
						<button
							onClick={handleLoginNavigate}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm"
						>
							Log In
						</button>
						<button
							onClick={handleSignupNavigate}
							className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-200"
						>
							Create Account
						</button>
					</div>

					<p className="mt-6 text-xs text-gray-400">
						Join BeSocial to connect with friends and share your moments.
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

export default AuthGuard;
