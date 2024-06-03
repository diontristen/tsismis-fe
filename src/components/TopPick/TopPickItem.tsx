import {
    Anchor,
    Box,
    Text
} from '@mantine/core';
import classes from '@/components/TopPick/TopPick.module.css';
function TopPickItem() {
    return (
        <Box className={classes.topPickItem}>
            <Text className={classes.topPickItemRank}>Top 1</Text>
            <Anchor className={classes.topPIckItemTag}>#AliceGuo</Anchor>
            <Text className={classes.topPickItemCount}>132 Tsismis</Text>
        </Box>
    );
}

export default TopPickItem;