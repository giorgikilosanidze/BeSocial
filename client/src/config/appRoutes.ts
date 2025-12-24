import routes from '@/constants/routes';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

const appRoutes = [
	{ path: routes.login, Component: Login },
	{ path: routes.signup, Component: Signup },
];

export default appRoutes;
