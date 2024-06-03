import { Button, Flex, Loader, Text } from '@mantine/core';
import Tsismis from '@/components/Tsismis';
import classes from '@/pages/Home/Home.module.css';
import { useGetTsismis } from '@/hooks/useTsismis';
import { useEffect } from 'react';
import { useTsimsisStore } from '@/store/useTsismisStore';
import { useUser } from '@/hooks/useUser';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmpty } from '@/utils/helper';
const TsismisList = () => {
    const { loadMoreProfileTsimis } = useGetTsismis();
    const { user } = useUser();
    const { tsismisList, hasNextPage, clearTsismis } = useTsimsisStore();

    useEffect(() => {
        clearTsismis();
    }, []);

    useEffect(() => {
        if (isEmpty(tsismisList)) {
            loadMoreProfileTsimis();
        }
    }, [tsismisList])

    return (
        <Flex className={classes.tsismisList}>
            <InfiniteScroll
                dataLength={tsismisList && tsismisList.length ? tsismisList.length : 0}
                next={loadMoreProfileTsimis}
                hasMore={hasNextPage}
                loader={<Flex align='center' justify='center' p='1rem'>
                    <Loader />
                </Flex>}
                endMessage={<Flex align='center' justify='center' p='1rem'>
                    <Text>No more items to load</Text>
                </Flex>}
                scrollableTarget="home"
            >

                {tsismisList && tsismisList.map((tsismis, index) => (
                    <Tsismis
                        key={tsismis.id}
                        index={index}
                        data={tsismis}
                        own={tsismis.user.id === user?.id}
                    />
                ))}
            </InfiniteScroll>
        </Flex>
    );
};

export default TsismisList;