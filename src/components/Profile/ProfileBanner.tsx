import {
    Box,
    Button,
    Flex,
    Image,
    Pill,
} from '@mantine/core';
import UserInfo from '@/components/Profile/UserInfo';
import classes from '@/components/Profile/Profile.module.css';
import { useProfileStore } from '@/store/useProfileStore';

interface Props {
    type: 'own' | 'visit'
}

const Banner = ({ type }: Props) => {
    const { profile, toggleEditProfileModal } = useProfileStore();

    return (
        <Box className={classes.banner}>
            <Image
                src='/assets/images/banner.jpeg'
                alt='Profile banner'
            />
            <Flex className={classes.header}>
                <Image
                    src={profile?.avatar}
                    alt="Profile photo"
                    className={classes.image}
                />
                {type === 'own' && <Button onClick={toggleEditProfileModal}>
                    Edit Profile
                </Button>}
                {type === 'visit' && <Pill size='lg' className={classes.pill}>
                     Certified Tsimosa
                </Pill>}
            </Flex>
            <UserInfo />
        </Box>
    );
};

export default Banner;