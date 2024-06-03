import { Flex, Loader, Text } from '@mantine/core';
import Tsismis from '@/components/Tsismis';
import classes from '@/pages/Home/Home.module.css';
import { useGetTsismis } from '@/hooks/useTsismis';
import { useEffect } from 'react';
import { useTsimsisStore } from '@/store/useTsismisStore';
import { useUser } from '@/hooks/useUser';
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmpty } from '@/utils/helper';
const TsismisList = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const { loadMoreSearchTsismis } = useGetTsismis();
    const { user } = useUser();
    const { tsismisList, hasNextPage, clearTsismis } = useTsimsisStore();

    useEffect(() => {
        clearTsismis();
    }, []);

    useEffect(() => {
        if(isEmpty(tsismisList) && query) {
            loadMoreSearchTsismis(query);
        }
    }, [query, tsismisList]);


    return (
        <Flex className={classes.tsismisList}>
            {isEmpty(query) && <Flex align='center' justify='center' p='1rem'>
                <Text>Start searching</Text>
            </Flex>}
            {!isEmpty(query) && <InfiniteScroll
                dataLength={tsismisList && tsismisList.length ? tsismisList.length : 0}
                next={() => loadMoreSearchTsismis(query ?? '')}
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
            </InfiniteScroll>}
        </Flex>
    );
};

export default TsismisList;