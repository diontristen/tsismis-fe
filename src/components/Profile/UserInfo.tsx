import {
    Box,
    Flex,
    Text
} from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import classes from '@/components/Profile/Profile.module.css';
import { useProfileStore } from '@/store/useProfileStore';
import { parseTimestampToMonthYear } from '@/utils/parser';
const UserInfo = () => {
    const { profile } = useProfileStore();
    return (
        <Box className={classes.content}>
            <Text className={classes.name}>{profile?.displayName}</Text>
            <Text className={classes.username}>@{profile?.username}</Text>
            <Text className={classes.desc}>{profile?.description}</Text>
            <Flex className={classes.joined}>
                <IconCalendar />
                {profile?.createdAt && <Text>Joined {parseTimestampToMonthYear(profile?.createdAt)}</Text>}
            </Flex>
            <Flex className={classes.dataContainer}>
                <Flex className={classes.data}>
                    <Text className={classes.value}>{profile?.tsismisCount}</Text>
                    <Text>Tsismis</Text>
                </Flex>
                <Flex className={classes.data}>
                    <Text className={classes.value}>{profile?.likesCount}</Text>
                    <Text>Likes</Text>
                </Flex>
                <Flex className={classes.data}>
                    <Text className={classes.value}>{profile?.favoritesCount}</Text>
                    <Text>Favorites</Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default UserInfo;