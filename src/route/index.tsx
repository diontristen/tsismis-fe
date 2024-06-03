import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Home from '@/pages/Home';
import PublicRoutes from './PublicRoutes';
import Login from '../pages/Login';
import Signup from '@/pages/Signup';
import Profile from '@/pages/Profile';
import ProfileVisit from '@/pages/ProfileVisit';
import { FAVORITES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, NOTIFICATIONS_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE, SETTINGS_ROUTE, SIGN_UP_ROUTE } from './routes';
import Notification from '@/pages/Notification';
import Favorites from '@/pages/Favorites';
import Settings from '@/pages/Settings';
import Search from '@/pages/Search';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path={LOGIN_ROUTE} element={<Login />} />
                    <Route path={SIGN_UP_ROUTE} element={<Signup />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route path={HOME_ROUTE} element={<Home />} />
                    <Route path={PROFILE_ROUTE} element={<Profile />} />
                    <Route path={`${PROFILE_ROUTE}/:username`} element={<ProfileVisit />} />
                    <Route path={NOTIFICATIONS_ROUTE} element={<Notification />} />
                    <Route path={FAVORITES_ROUTE} element={<Favorites />} />
                    <Route path={SETTINGS_ROUTE} element={<Settings />} />
                    <Route path={SEARCH_ROUTE} element={<Search />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;