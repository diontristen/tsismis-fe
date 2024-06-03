import { MenuItemType } from '@/components/Sidebar/MenuItem';
import { IconBell, IconHome, IconSearch, IconSettings, IconStar, IconUser } from '@tabler/icons-react';
import { Button, Flex } from '@mantine/core';
import MenuItem from '@/components/Sidebar/MenuItem';
import {
    FAVORITES_ROUTE,
    HOME_ROUTE,
    NOTIFICATIONS_ROUTE,
    PROFILE_ROUTE,
    SEARCH_ROUTE,
    SETTINGS_ROUTE
} from '@/route/routes';
import classes from '@/components/Sidebar/Sidebar.module.css';
import { useContextStore } from '@/store/useContexStore';

interface Props {
    screen: 'desktop' | 'mobile'
}

const MENUS: MenuItemType[] = [
    {
        key: 'home',
        icon: IconHome,
        name: 'Home',
        link: HOME_ROUTE,
        desktop: true,
        mobile: true
    },
    {
        key: 'profile',
        icon: IconUser,
        name: 'Profile',
        link: PROFILE_ROUTE,
        desktop: true,
        mobile: true
    },
    {
        key: 'search',
        icon: IconSearch,
        name: 'Search',
        link: SEARCH_ROUTE,
        desktop: true,
        mobile: true
    },
    {
        key: 'favorites',
        icon: IconStar,
        name: 'Favorites',
        link: FAVORITES_ROUTE,
        desktop: true,
        mobile: true
    },
    {
        key: 'settings',
        icon: IconSettings,
        name: 'Settings',
        link: SETTINGS_ROUTE,
        desktop: true,
        mobile: true
    }
]

const Menu = ({ screen }: Props) => {
    const { toggleCreateTsismisModal } = useContextStore();
    return (
        <Flex className={classes.menu}>
            {MENUS && MENUS.map((menu: MenuItemType) => {
                if((screen === 'desktop' && menu.desktop) || (screen === 'mobile' && menu.mobile)) {
                    return <MenuItem
                        key={menu.key}
                        menu={menu}
                    />
                }
            })}
            <Button onClick={toggleCreateTsismisModal}>
                Create Tsismis
            </Button>
        </Flex>
    );
};

export default Menu;