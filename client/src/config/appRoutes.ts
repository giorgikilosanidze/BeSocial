import routes from '@/constants/routes';
import AuthGuard from '@/guards/AuthGuard';
import LoginSignupGuard from '@/guards/LoginSignupGuard';
import Feed from '@/pages/Feed';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import Signup from '@/pages/Signup';
import Post from '@/pages/Post';

const appRoutes = [
	{ path: routes.login, Component: Login, Guard: LoginSignupGuard },
	{ path: routes.signup, Component: Signup, Guard: LoginSignupGuard },
	{ path: routes.feed, Component: Feed, Guard: AuthGuard },
	{ path: routes.profile, Component: Profile, Guard: AuthGuard },
	{ path: routes.post, Component: Post, Guard: AuthGuard },
	{ path: routes.notFound, Component: NotFound },
];

export default appRoutes;
