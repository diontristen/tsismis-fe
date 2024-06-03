import {
    Anchor,
    Flex,
    Image,
    Text
} from '@mantine/core';
import classes from '@/components/Tsismis/Tsismis.module.css';
import Actions from '@/components/Tsismis/Actions';
import Hashtag from '@/components/Tsismis/Hashtag';
import { ITsismis } from '@/types/tsismis';
import { parseTimestampToReadable } from '@/utils/parser';
import { PROFILE_ROUTE } from '@/route/routes';
import Settings from '@/components/Tsismis/Settings';

interface Props {
    data: ITsismis;
    own: boolean;
}

const Tsismis = ({ data, own }: Props) => {
    const userLink = own ? PROFILE_ROUTE : `${PROFILE_ROUTE}/${data.user.username}`

    return (
        <Flex className={classes.container}>
            <Flex >
                <Image
                    src={data.user.avatar}
                    className={classes.image}
                />
            </Flex>
            <Flex className={classes.content}>
                <Flex className={classes.header}>
                    <Text className={classes.name}>{data.user.displayName}</Text>
                    <Anchor href={userLink}>@{data.user.username}</Anchor>
                    <Text className={classes.dateTime}>{parseTimestampToReadable(data.createdAt)}</Text>
                </Flex>
                <Text>
                    {data.message}
                </Text>
                <Hashtag
                    tags={data.tags}
                />
                <Actions data={data} />
            </Flex>
            {own && <Settings
                data={data}
            />}
        </Flex>
    );
};

export default Tsismis;