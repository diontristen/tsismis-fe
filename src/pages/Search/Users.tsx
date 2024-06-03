import { Box, Flex, Loader, Text } from "@mantine/core";
import LatestTsismosaItem from "@/components/LatestTsismosa/LatestTsismosaItem";
import classes from '@/components/Users/Users.module.css';
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchUsers } from "@/hooks/useUser";
import { useUsersStore } from "@/store/useUsersStore";
import { isEmpty } from "@/utils/helper";
import InfiniteScroll from "react-infinite-scroll-component";
const Users = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const { loadMoreUserSearch } = useSearchUsers();
    const { users, hasNextPage, clearUsers } = useUsersStore();

    useEffect(() => {
        clearUsers();
    }, []);

    useEffect(() => {
        if(isEmpty(users) && query) {
            loadMoreUserSearch(query);
        }
    }, [query, users]);


    return (
        <Box className={classes.content}>
            {isEmpty(query) && <Flex align='center' justify='center' p='1rem'>
                <Text>Start searching</Text>
            </Flex>}
            {!isEmpty(query) && <InfiniteScroll
                dataLength={users && users.length ? users.length : 0}
                next={() => loadMoreUserSearch(query ?? '')}
                hasMore={hasNextPage}
                loader={<Flex align='center' justify='center' p='1rem'>
                    <Loader />
                </Flex>}
                endMessage={<Flex align='center' justify='center' p='1rem'>
                    <Text>No more items to load</Text>
                </Flex>}
                scrollableTarget="home"
            >
                {users && users.map((user) => (
                    <LatestTsismosaItem
                        key={user.id}
                        user={user}
                    />
                ))}
            </InfiniteScroll>}


        </Box>
    );
};

export default Users;