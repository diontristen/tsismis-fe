import { Flex } from '@mantine/core';
import classes from '@/pages/Notification/Notification.module.css';
import NotificationItem from '@/components/NotificationItem';
const NotificationList = () => {
    return (
        <Flex className={classes.notificationList}>
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
        </Flex>
    );
};

export default NotificationList;