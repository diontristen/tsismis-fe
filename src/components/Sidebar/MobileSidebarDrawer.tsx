import {
    Drawer,
    Flex,
 } from '@mantine/core';
import classes from '@/components/Sidebar/MobileSidebar.module.css';
import Menu from './Menu';
import User from './User';
interface Props {
    opened: boolean;
    onToggle: () => void;
}

const MobileSidebarDrawer = ({ opened, onToggle }: Props) => {
    return (
        <Drawer
            position='left'
            opened={opened}
            onClose={onToggle}
            classNames={{
                body: classes.drawerBody
            }}
        >
            <Flex className={classes.drawerContainer}>
                <Menu screen='mobile'/>
                <User/>
            </Flex>
        </Drawer>
    );
};

export default MobileSidebarDrawer;