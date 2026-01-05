import { useAppSelector } from '@/hooks/reduxHooks';

const Feed = () => {
	const user = useAppSelector((state) => state.auth.user);
	console.log(user);

	return <div>Feed</div>;
};

export default Feed;
