import Layout from '@/components/Layout';
import { Box, Tabs } from '@mantine/core';
import classes from '@/pages/Search/Search.module.css';
import SearchInput from '@/components/Search/SearchInput';
import TsismisList from '@/pages/Search/TsismisList';
import Users from '@/pages/Search/Users';
const Search = () => {
    return (
        <Layout page='Search'>
            <Box className={classes.search}>
                <SearchInput/>
            </Box>
            <Tabs defaultValue="tsismis"
                classNames={{
                    tabLabel: classes.tabs,  
                    tab: classes.tabsTab
                }}
            >
                <Tabs.List>
                    <Tabs.Tab value="tsismis">
                        Tsismis
                    </Tabs.Tab>
                    <Tabs.Tab value="tsismosa">
                        Tsismosa
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="tsismis">
                   <TsismisList/>
                </Tabs.Panel>

                <Tabs.Panel value="tsismosa">
                    <Users/>
                </Tabs.Panel>
            </Tabs>
        </Layout>
    );
};

export default Search;