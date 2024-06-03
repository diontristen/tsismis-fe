import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TsismisList from '@/pages/ProfileVisit/TsismisList';
import Layout from '@/components/Layout';
import Banner from '@/components/Profile/ProfileBanner';
import { useProfile } from '@/hooks/useProfile';
import { isEmpty } from '@/utils/helper';
const ProfileVisit = () => {
    const { profile, getUserByUsername } = useProfile();
    const { username } = useParams();
    useEffect(() => {
        if(!isEmpty(username)) {
            getUserByUsername(username ?? '');
        }
    }, [username]);
    return (
        <Layout page={profile?.displayName}>
            <Banner type='visit' />
            <TsismisList />
        </Layout>
    );
};

export default ProfileVisit;