import { Box, Flex } from '@mantine/core';
import { ReactNode } from 'react';
import Sidebar from '../Sidebar';
import RightInfoBar from '../RightInfoBar';
import classes from '@/components/Layout/Layout.module.css';
import MobileSidebar from '../Sidebar/MobileSidebar';
import PageHeader from '@/components/Common/PageHeader';
import TsismisModal from '../TsismisInput/TsismisModal';
import TsismisEditModal from '../TsismisInput/TsismisEditModal';
interface Props {
    page: string;
    children: ReactNode;
}


const Layout = ({ page, children }: Props) => {
    return (
        <Flex className={classes.container}>
            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>
            <Box className={classes.home} id="home">
                <MobileSidebar />
                <PageHeader page={page} />
                <Box>
                    {children}
                </Box>
                <TsismisModal/>
                <TsismisEditModal/>
            </Box>
            <Box className={classes.info}>
                <RightInfoBar />
            </Box>
        </Flex>
    );
};

export default Layout;