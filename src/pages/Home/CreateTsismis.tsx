import { Box } from '@mantine/core';
import classes from '@/pages/Home/Home.module.css';
import TsismisInput from '@/components/TsismisInput';
const CreateTsismis = () => {
    return (
        <Box className={classes.create}>
            <TsismisInput
                type='create'
            />
        </Box>
    );
};

export default CreateTsismis;