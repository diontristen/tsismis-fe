import { Flex, Loader, Text } from '@mantine/core';
import Tsismis from '@/components/Tsismis';
import classes from '@/pages/Home/Home.module.css';
import { useGetTsismis } from '@/hooks/useTsismis';
import { useEffect } from 'react';
import { useTsimsisStore } from '@/store/useTsismisStore';
import { useParams } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { isEmpty } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
const TsismisList = () => {
    const { username } = useParams<{ username: string }>();

    const { loadMoreProfileVisitTsimis } = useGetTsismis();
    const { user } = useUser();
    const { tsismisList, hasNextPage, clearTsismis } = useTsimsisStore();

    useEffect(() => {
        clearTsismis();
    }, []);

    useEffect(() => {
        if(isEmpty(tsismisList) && username) {
            loadMoreProfileVisitTsimis(username);
        }
    }, [username, tsismisList])


    return (
        <Flex className={classes.tsismisList}>
            <InfiniteScroll
                dataLength={tsismisList && tsismisList.length ? tsismisList.length : 0}
                next={() => loadMoreProfileVisitTsimis(username ?? '')}
                hasMore={hasNextPage}
                loader={<Flex align='center' justify='center' p='1rem'>
                    <Loader />
                </Flex>}
                endMessage={<Flex align='center' justify='center' p='1rem'>
                    <Text>No more items to load</Text>
                </Flex>}
                scrollableTarget="home"
            >
                {tsismisList && tsismisList.map((tsismis) => (
                    <Tsismis
                        key={tsismis.id}
                        data={tsismis}
                        own={tsismis.user.id === user?.id}
                    />
                ))}
            </InfiniteScroll>
        </Flex>
    );
};

export default TsismisList;