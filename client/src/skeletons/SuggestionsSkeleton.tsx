const SuggestionsSkeleton = () => {
	return (
		<div className="space-y-3">
			{[1, 2, 3].map((i) => (
				<div key={i} className="flex items-center justify-between animate-pulse">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
						<div>
							<div className="h-4 bg-gray-200 rounded w-24"></div>
						</div>
					</div>
					<div className="h-4 bg-gray-200 rounded w-12"></div>
				</div>
			))}
		</div>
	);
};

export default SuggestionsSkeleton;
