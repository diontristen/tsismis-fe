import {
    Flex,
    Menu,
    Text,
    Image
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import classes from '@/components/Sidebar/Sidebar.module.css';
import { useLogout } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
const User = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useUser();

    const onLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Menu
            position='right-end'
            classNames={{
                dropdown: classes.userDropdown
            }}
        >
            <Menu.Target>
                <Flex className={classes.user}>
                    <Flex>
                        <Image
                            className={classes.userIcon}
                            src={user?.avatar}
                            alt='User icon'
                        />
                    </Flex>
                    <Flex className={classes.userDetails}>
                        <Text className={classes.name}>{user?.displayName}</Text>
                        <Text className={classes.username}>@{user?.username}</Text>
                    </Flex>
                    <IconDotsVertical />
                </Flex>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={onLogout}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default User;