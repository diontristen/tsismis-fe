import { Box, Loader as MLoader } from '@mantine/core';
import classes from '@/components/Common/styles/Loader.module.css';
const Loader = () => {
    return (
        <Box className={classes.container}>
            <MLoader/>
        </Box>
    );
};

export default Loader;