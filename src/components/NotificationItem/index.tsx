import {
    Anchor,
    Flex,
    Image,
    Text
} from '@mantine/core';
import classes from '@/components/NotificationItem/NotificationItem.module.css';
const avatarUrl = `https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=1`;
const NotificationItem = () => {
    return (
        <Flex className={classes.container}>
            <Flex >
                <Image
                    src={avatarUrl}
                    className={classes.image}
                />
            </Flex>
            <Flex className={classes.content}>
                <Text><Anchor>@maritest32</Anchor> liked your tsismis</Text>
                <Text className={classes.tsismis}>
                    President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.
                </Text>
                <Text className={classes.dateTime}>2m ago</Text>
            </Flex>
        </Flex>
    );
};

export default NotificationItem;