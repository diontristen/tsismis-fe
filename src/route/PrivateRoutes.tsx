import Loader from '@/components/Common/Loader';
import { AUTH_TOKEN } from '@/data/localStorage';
import { useLogout } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const { getUser, loading, error } = useUser();
  const { logout } = useLogout();
  const onGetUser = async () => {
    await getUser();
  }
  useEffect(() => {
    onGetUser();
  }, []);

  if(loading) {
    return <Loader />
  }
  if(error) {
    logout();
    return <Navigate to='/login' />
  }

  return (
    token ? <Outlet /> : <Navigate to='/login' />
  )
};

export default PrivateRoutes;