const ProfilePhotos = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">Photos</h3>
				<a
					href="#"
					className="text-sm text-blue-600 hover:underline"
				>
					See all
				</a>
			</div>
			<div className="grid grid-cols-3 gap-2">
				<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200"
						alt="Photo 1"
						className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
					/>
				</div>
				<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
						alt="Photo 2"
						className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
					/>
				</div>
				<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
						alt="Photo 3"
						className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
					/>
				</div>
				<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
						alt="Photo 4"
						className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
					/>
				</div>
				<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
						alt="Photo 5"
						className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
					/>
				</div>
				<div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
					<img
						src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
						alt="Photo 6"
						className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfilePhotos;
