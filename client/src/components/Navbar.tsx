import fetchSearchedUsers from '@/api/fetchSearchedUsers';
import NotificationDropdown from './NotificationDropdown';
import NotificationModal from './NotificationModal';
import routes from '@/constants/routes';
import { logOutUser } from '@/features/auth/authThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useDebounce } from '@/hooks/useDebounce';
import SearchSkeleton from '@/skeletons/SearchSkeleton';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleUnreadNotifications } from '@/features/navbar/navbarSlice';

type SearchedUsers = SearchedUser[];

interface SearchedUser {
	id: string;
	username: string;
	profilePictureUrl?: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Navbar = () => {
	const user = useAppSelector((state) => state.auth.user);
	const hasUnreadNotifications = useAppSelector((state) => state.navbar.hasUnreadNotifications);
	const [isAccountMenuShown, setIsAccountMenuShown] = useState(false);
	const userIconParentRef = useRef<HTMLDivElement>(null);
	const [searchValue, setSearchValue] = useState('');
	const [searchedUsers, setSearchedUsers] = useState<SearchedUsers>([]);
	const debouncedSearch = useDebounce(searchValue);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const profilePictureSrc = user.profilePictureUrl
		? `${SERVER_URL}/${user.profilePictureUrl}`
		: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

	useEffect(() => {
		const loadSearchedUsers = async () => {
			const users = await fetchSearchedUsers(debouncedSearch);
			setSearchedUsers(users);
			setIsSearchLoading(false);
		};

		if (debouncedSearch && debouncedSearch === searchValue) {
			loadSearchedUsers();
		}
	}, [debouncedSearch, searchValue]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const path = event.composedPath();

			if (userIconParentRef.current && !path.includes(userIconParentRef.current)) {
				setIsAccountMenuShown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isAccountMenuShown]);

	const toggleNotifications = () => {
		if (!isNotificationsOpen) {
			dispatch(toggleUnreadNotifications(false));
		}

		setIsNotificationsOpen(!isNotificationsOpen);
	};

	const handleSeeAllNotifications = () => {
		setIsNotificationsOpen(false);
		setIsNotificationModalOpen(true);
	};

	const handleSearchValue = (value: string) => {
		setSearchValue(value);
		setIsSearchLoading(value ? true : false);

		if (!value) {
			setSearchedUsers([]);
		}
	};

	const handleGoToProfilePage = (userId?: string) => {
		if (!userId) {
			navigate(routes.profile.replace(':userId', user.id));
		} else {
			navigate(routes.profile.replace(':userId', userId));
			setSearchedUsers([]);
			setSearchValue('');
			setIsSearchLoading(false);
		}
	};

	const handleNavigationToHome = () => {
		navigate(routes.feed);
	};

	const toggleAccountMenuVisibility = () => {
		setIsAccountMenuShown(!isAccountMenuShown);
	};

	const handleLogOut = async () => {
		try {
			await dispatch(logOutUser()).unwrap();
			navigate(routes.login, { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
		<nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div
						onClick={handleNavigationToHome}
						className="flex items-center space-x-2 cursor-pointer"
					>
						<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
							<svg
								className="w-5 h-5 text-white"
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
						<span className="text-xl font-bold text-gray-900">BeSocial</span>
					</div>

					{/* Search Bar */}
					<div className="hidden md:flex flex-1 max-w-md mx-8">
						<div className="relative w-full">
							<input
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									handleSearchValue(e.target.value)
								}
								value={searchValue}
								type="text"
								placeholder="Search Users..."
								className="w-full bg-gray-100 border-0 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
							/>
							<svg
								className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
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

							{searchValue && (
								<div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 max-h-96 overflow-y-auto">
									<div className="py-1">
										{searchedUsers.map((user) => {
											const profilePictureSrc = user.profilePictureUrl
												? `${SERVER_URL}/${user.profilePictureUrl}`
												: 'https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=200';

											return (
												<div
													key={user.id}
													onClick={() => handleGoToProfilePage(user.id)}
													className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
												>
													<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
														<img
															src={profilePictureSrc}
															alt="User Profile"
															className="w-full h-full object-cover"
														/>
													</div>
													<div className="ml-3 flex-1 min-w-0">
														<p className="text-sm font-semibold text-gray-900 truncate">
															{user.username}
														</p>
														<p className="text-xs text-gray-500 truncate">
															245 followers
														</p>
													</div>
												</div>
											);
										})}
									</div>

									{isSearchLoading && searchedUsers.length === 0 && (
										<SearchSkeleton />
									)}

									{searchedUsers.length === 0 && !isSearchLoading && (
										<div className="p-4 text-center text-gray-500">
											<p className="text-sm">No users found</p>
										</div>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Right Icons */}
					<div className="flex items-center space-x-4">
						<button
							onClick={handleNavigationToHome}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<svg
								className="w-6 h-6 text-gray-600"
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
						</button>
						<div className="relative">
							<button
								onClick={toggleNotifications}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
							>
								<svg
									className="w-6 h-6 text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
								{hasUnreadNotifications && (
									<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
								)}
							</button>

							{isNotificationsOpen && <NotificationDropdown onSeeAll={handleSeeAllNotifications} />}
						</div>
						<button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
							<svg
								className="w-6 h-6 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							</svg>
						</button>
						<div className="relative" ref={userIconParentRef}>
							<button
								onClick={toggleAccountMenuVisibility}
								className="flex items-center focus:outline-none"
							>
								<div className="w-9 h-9 rounded-full overflow-hidden border-2 cursor-pointer transition-transform transform hover:scale-105">
									<img
										src={profilePictureSrc}
										alt="Profile"
										className="w-full h-full object-cover"
									/>
								</div>
							</button>

							{isAccountMenuShown && (
								<div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 scale-95 transition-all duration-200 ease-out origin-top-right">
									<div
										onClick={() => handleGoToProfilePage()}
										className="px-4 py-3 border-b border-gray-100 mb-2 hover:bg-gray-100 transition-colors cursor-pointer"
									>
										<p className="text-sm font-semibold text-gray-900">
											{user.username}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{user.email}
										</p>
									</div>

									<a
										href="#"
										className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
									>
										<svg
											className="w-4 h-4 mr-3"
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
										Liked Posts
									</a>
									<a
										href="#"
										className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
									>
										<svg
											className="w-4 h-4 mr-3"
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
										Security
									</a>
									<a
										href="#"
										className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
									>
										<svg
											className="w-4 h-4 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										Privacy
									</a>

									<div className="border-t border-gray-100 my-2"></div>
									<button
										onClick={handleLogOut}
										className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
									>
										<svg
											className="w-4 h-4 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Log Out
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
		{isNotificationModalOpen && (
			<NotificationModal onClose={() => setIsNotificationModalOpen(false)} />
		)}
		</>
	);
};

export default Navbar;
