import { AUTH_TOKEN } from '@/data/localStorage';
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return (
    token ? <Navigate to='/' /> : <Outlet />
  )
};

export default PublicRoutes;