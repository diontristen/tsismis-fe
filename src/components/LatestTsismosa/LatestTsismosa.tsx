import {
    Box,
    Text
} from "@mantine/core";
import classes from '@/components/LatestTsismosa/LatestTsismosa.module.css';
import LatestTsismosaItem from "@/components/LatestTsismosa/LatestTsismosaItem";
import { useLatestUsers } from "@/hooks/useLatestUsers";
import { useEffect } from "react";
import { IUser } from "@/types/user";
const LatestTsismosa = () => {
    const { latestUsers, loading, getLatestUsers } = useLatestUsers();

    useEffect(() => {
        getLatestUsers();
    }, [])


    return (
        <Box className={classes.latestTsismosa}>
            <Box className={classes.header}>
                <Text className={classes.title}>Latest Tsismosa</Text>
            </Box>
            <Box className={classes.content}>
                {!loading && latestUsers && latestUsers.map((user: IUser) => (
                    <LatestTsismosaItem
                        key={user.id}
                        user={user}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default LatestTsismosa;