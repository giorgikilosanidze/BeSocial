const AngryButtonSvg = ({ isActive }: { isActive?: boolean }) => {
	return (
		<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
			{/* Face circle */}
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth={2}
				fill={isActive ? 'currentColor' : 'none'}
			/>
			{/* Inner face details - visible when active (white on filled) or dark when inactive */}
			<g className={isActive ? 'text-white' : 'text-current'}>
				{/* Left eyebrow - angled down */}
				<path
					d="M7 8.5L9.5 9.5"
					stroke={isActive ? 'white' : 'currentColor'}
					strokeWidth={1.5}
					strokeLinecap="round"
				/>
				{/* Right eyebrow - angled down */}
				<path
					d="M17 8.5L14.5 9.5"
					stroke={isActive ? 'white' : 'currentColor'}
					strokeWidth={1.5}
					strokeLinecap="round"
				/>
				{/* Left eye */}
				<circle
					cx="9"
					cy="11.5"
					r="1"
					fill={isActive ? 'white' : 'currentColor'}
				/>
				{/* Right eye */}
				<circle
					cx="15"
					cy="11.5"
					r="1"
					fill={isActive ? 'white' : 'currentColor'}
				/>
				{/* Frown */}
				<path
					d="M9 16.5C9 16.5 10.5 14.5 12 14.5C13.5 14.5 15 16.5 15 16.5"
					stroke={isActive ? 'white' : 'currentColor'}
					strokeWidth={1.5}
					strokeLinecap="round"
					fill="none"
				/>
			</g>
		</svg>
	);
};

export default AngryButtonSvg;
