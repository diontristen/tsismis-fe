import { Box } from '@mantine/core';
import classes from '@/components/RightInfoBar/RightInfoBar.module.css';
import LatestTsismosa from '@/components/LatestTsismosa/LatestTsismosa';
import SearchInput from '@/components/Search/SearchInput';
const RightInfoBar = () => {
    return (
        <Box className={classes.container}>
            <SearchInput/>
            <LatestTsismosa/>
        </Box>
    );
};

export default RightInfoBar;