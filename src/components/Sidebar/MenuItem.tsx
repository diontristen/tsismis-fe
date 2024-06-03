import {
    Flex,
    Text
} from '@mantine/core';
import classes from '@/components/Sidebar/Sidebar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
export interface MenuItemType {
    key: string;
    icon: any;
    name: string;
    link: string;
    desktop: boolean;
    mobile: boolean;
}

interface Props {
    menu: MenuItemType
}

const MenuItem = ({ menu }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const onClick = () => {
        navigate(menu.link);
    }

    return (
        <Flex 
        className={classes.menuItem}
        data-active={menu.link === currentPath}
        onClick={onClick}
        >
            <menu.icon className={classes.menuItemIcon} />
            <Text>{menu.name}</Text>
        </Flex>
    );
};

export default MenuItem;