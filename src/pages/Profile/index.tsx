import Layout from '@/components/Layout';
import TsismisList from '@/pages/Profile/TsismisList';
import Banner from '@/components/Profile/ProfileBanner';
import { useUser } from '@/hooks/useUser';
import { useProfileStore } from '@/store/useProfileStore';
import { useEffect } from 'react';
import { isEmpty } from '@/utils/helper';
import EditProfileModal from '@/components/Profile/EditProfileModal';

const Profile = () => {
    const { user } = useUser();
    const { setProfile } = useProfileStore();

    useEffect(() => {
        if(!isEmpty(user)) {
            setProfile(user);
        }
    }, [user]);
    return (
        <Layout page={user?.displayName || ''}>
            <Banner type='own'/>
            <TsismisList/>
            <EditProfileModal/>
        </Layout>
    );
};

export default Profile;