import {
    Box,
    Text
} from "@mantine/core";
import classes from '@/components/TopPick/TopPick.module.css';
import TopPickItem from "./TopPickItem";
const TopPick = () => {
    return (
        <Box className={classes.topPick}>
            <Box className={classes.header}>
                <Text className={classes.title}>Juicy Tsismis</Text>
            </Box>
            <Box className={classes.content}>
                <TopPickItem />
                <TopPickItem />
                <TopPickItem />
            </Box>
        </Box>
    );
};

export default TopPick;