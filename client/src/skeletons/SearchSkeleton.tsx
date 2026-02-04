const SearchSkeleton = () => {
	return (
		<div className="py-1">
			{[1, 2, 3].map((i) => (
				<div key={i} className="flex items-center px-4 py-3">
					<div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse flex-shrink-0"></div>
					<div className="ml-3 flex-1">
						<div className="h-4 bg-gray-100 rounded animate-pulse mb-2 w-3/4"></div>
						<div className="h-3 bg-gray-100 rounded animate-pulse w-1/2"></div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SearchSkeleton;
