import {
    Anchor,
    Flex,
    Image,
} from '@mantine/core';
import classes from '@/components/Sidebar/Sidebar.module.css';
import Menu from '@/components/Sidebar/Menu';
import User from '@/components/Sidebar/User';

const Sidebar = () => {
    return (
        <Flex className={classes.container}>
            <Anchor href='/'>
                <Image
                    src='/tsismis.svg'
                    alt='Company logo'
                    className={classes.logo}
                />
            </Anchor>
            <Menu screen='desktop'/>
            <User/>
        </Flex>
    );
};

export default Sidebar;