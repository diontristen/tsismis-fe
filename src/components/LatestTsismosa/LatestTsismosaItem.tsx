import {
    Text,
    Flex,
    Button,
    Image,
    Box
} from '@mantine/core';
import classes from '@/components/LatestTsismosa/LatestTsismosa.module.css';
import { IUser } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '@/route/routes';
import { useUser } from '@/hooks/useUser';

interface Props {
    user: IUser
}

function LatestTsismosaItem({ user }: Props) {
    const navigate = useNavigate();
    const { user: currentUser } = useUser();
    const userLink = currentUser?.username === user?.username ? PROFILE_ROUTE : `${PROFILE_ROUTE}/${user?.username}`

    const onVisit = () => {
        navigate(userLink)
    }

    return (
        <Flex
            className={classes.latestTsismosaItem}
            onClick={onVisit}
        >
            <Image
                src={user?.avatar}
                className={classes.image}
            />
            <Box className={classes.latestTsismosaContent}>
                <Text className={classes.lastestTsismosaName}>{user?.displayName}</Text>
                <Text className={classes.latestTsimosaUsername}>@{user?.username}</Text>
            </Box>
            <Button
                onClick={onVisit}
            >
                Visit
            </Button>
        </Flex>
    );
}

export default LatestTsismosaItem;