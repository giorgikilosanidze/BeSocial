interface LoveProps {
	divWidth?: string;
	divHeight?: string;
	svgWidth?: string;
	svgHeight?: string;
}

const Love = ({
	divWidth = 'w-5',
	divHeight = 'h-5',
	svgWidth = 'w-3',
	svgHeight = 'h-3',
}: LoveProps) => {
	return (
		<div
			className={`${divWidth} ${divHeight} bg-red-500 rounded-full flex items-center justify-center border border-white`}
		>
			<svg
				className={`${svgWidth} ${svgHeight} text-white`}
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fillRule="evenodd"
					d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					clipRule="evenodd"
				/>
			</svg>
		</div>
	);
};

export default Love;
