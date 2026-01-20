import { fetchProfileInfo } from '@/features/profile/profileThunks';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
	const { userId } = useParams<{ userId: string }>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchProfileInfo(userId));
	}, [userId, dispatch]);

	return <div>Profile</div>;
};

export default Profile;
