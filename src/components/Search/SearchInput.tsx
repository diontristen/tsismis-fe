import {
    ActionIcon,
    Box,
    Flex,
    TextInput
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from '@/components/Search/Search.module.css';
import { SEARCH_ROUTE } from '@/route/routes';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isEmpty } from '@/utils/helper';
import { useGetTsismis } from '@/hooks/useTsismis';
import { useSearchUsers } from '@/hooks/useUser';
const SearchInput = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { getTsismisBySearch } = useGetTsismis();
    const { getUsersByUsernameSearch } = useSearchUsers();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    
    const onVisit = () => {
        if (currentPath === SEARCH_ROUTE) {
            getTsismisBySearch(search, '', 'set');
            getUsersByUsernameSearch(search, '', 'set');
            navigate(`${SEARCH_ROUTE}?q=${search}`)
        } else {
            navigate(`${SEARCH_ROUTE}?q=${search}`)
        }
    }

    useEffect(() => {
        if (query && !isEmpty(query)) {
            setSearch(query)
        }
    }, [query])

    return (
        <Box>
            <Flex className={classes.searchBar}>
                <TextInput
                    className={classes.input}
                    leftSection={<IconSearch />}
                    placeholder='Look for tsismosa or tsismis'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <ActionIcon
                    className={classes.cta}
                    onClick={onVisit}
                >
                    <IconSearch/>
                </ActionIcon>
            </Flex>
        </Box>
    );
};

export default SearchInput;