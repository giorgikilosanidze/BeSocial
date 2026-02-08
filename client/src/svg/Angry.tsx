interface AngryProps {
	divWidth?: string;
	divHeight?: string;
	svgWidth?: string;
	svgHeight?: string;
}

const Angry = ({
	divWidth = 'w-5',
	divHeight = 'h-5',
	svgWidth = 'w-3',
	svgHeight = 'h-3',
}: AngryProps) => {
	return (
		<div
			className={`${divWidth} ${divHeight} bg-gradient-to-b from-yellow-400 via-orange-500 to-orange-600 rounded-full flex items-center justify-center border border-white`}
		>
			<svg className={`${svgWidth} ${svgHeight}`} viewBox="0 0 24 24" fill="none">
				{/* Left eyebrow - curved and thick */}
				<path
					d="M5 9C5 9 6.5 7.5 9 8.5"
					stroke="#5D4037"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				{/* Right eyebrow - curved and thick */}
				<path
					d="M19 9C19 9 17.5 7.5 15 8.5"
					stroke="#5D4037"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				{/* Left eye - oval */}
				<ellipse cx="8" cy="11" rx="1.2" ry="1.5" fill="#5D4037" />
				{/* Right eye - oval */}
				<ellipse cx="16" cy="11" rx="1.2" ry="1.5" fill="#5D4037" />
				{/* Frown mouth */}
				<path
					d="M8 17C8 17 10 14.5 12 14.5C14 14.5 16 17 16 17"
					stroke="#5D4037"
					strokeWidth="1.5"
					strokeLinecap="round"
					fill="none"
				/>
			</svg>
		</div>
	);
};

export default Angry;
