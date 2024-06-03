import { Text, Image, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/components/Sidebar/MobileSidebar.module.css';
import MobileSidebarDrawer from './MobileSidebarDrawer';
const MobileSidebar = () => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <>
            <Flex className={classes.container}>
                <Flex className={classes.company}>
                    <Image
                        src='/tsismis.svg'
                        alt='Company Logo'
                        className={classes.logo}
                    />
                    <Text className={classes.name}>
                        <Text component='span' inherit className={classes.special}>T</Text>
                        sismis</Text>
                </Flex>
                <Burger
                    size="sm"
                    opened={opened}
                    onClick={toggle}
                    aria-label="Toggle sidebar"
                />
            </Flex>
            <MobileSidebarDrawer
                opened={opened}
                onToggle={toggle}
            />
        </>
    );
};

export default MobileSidebar;