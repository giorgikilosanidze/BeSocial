const ProfileFriends = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">
					Friends
					<span className="text-sm text-gray-500 font-normal ml-2">
						(531)
					</span>
				</h3>
				<a
					href="#"
					className="text-sm text-blue-600 hover:underline"
				>
					See all
				</a>
			</div>
			<div className="grid grid-cols-3 gap-3">
				<div className="flex flex-col items-center">
					<div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
						<img
							src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563eb&color=fff&size=100"
							alt="Sarah Johnson"
							className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
						/>
					</div>
					<p className="text-xs font-medium text-gray-900 text-center truncate w-full">
						Sarah Johnson
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
						<img
							src="https://ui-avatars.com/api/?name=Mike+Chen&background=10b981&color=fff&size=100"
							alt="Mike Chen"
							className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
						/>
					</div>
					<p className="text-xs font-medium text-gray-900 text-center truncate w-full">
						Mike Chen
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
						<img
							src="https://ui-avatars.com/api/?name=Emma+Wilson&background=f59e0b&color=fff&size=100"
							alt="Emma Wilson"
							className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
						/>
					</div>
					<p className="text-xs font-medium text-gray-900 text-center truncate w-full">
						Emma Wilson
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
						<img
							src="https://ui-avatars.com/api/?name=James+Brown&background=8b5cf6&color=fff&size=100"
							alt="James Brown"
							className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
						/>
					</div>
					<p className="text-xs font-medium text-gray-900 text-center truncate w-full">
						James Brown
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
						<img
							src="https://ui-avatars.com/api/?name=Lisa+Garcia&background=ec4899&color=fff&size=100"
							alt="Lisa Garcia"
							className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
						/>
					</div>
					<p className="text-xs font-medium text-gray-900 text-center truncate w-full">
						Lisa Garcia
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
						<img
							src="https://ui-avatars.com/api/?name=Tom+Davis&background=06b6d4&color=fff&size=100"
							alt="Tom Davis"
							className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
						/>
					</div>
					<p className="text-xs font-medium text-gray-900 text-center truncate w-full">
						Tom Davis
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileFriends;
