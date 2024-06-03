import { Flex } from '@mantine/core';
import { IconFeather } from '@tabler/icons-react';
import classes from '@/components/TsismisInput/TsismisInput.module.css';
import { useContextStore } from '@/store/useContexStore';
const Floating = () => {
    const { toggleCreateTsismisModal } = useContextStore();

    return (
        <Flex className={classes.floating} onClick={toggleCreateTsismisModal}>
            <IconFeather className={classes.floatingIcon}/>
        </Flex>
    );
};

export default Floating;