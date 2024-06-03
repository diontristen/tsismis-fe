import { useDeleteTsismis } from '@/hooks/useTsismis';
import { ActionIcon, Menu } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';
import classes from '@/components/Tsismis/Tsismis.module.css';
import { useContextStore } from '@/store/useContexStore';
import { ITsismis } from '@/types/tsismis';

interface Props {
    data: ITsismis;
}

const Settings = ({ data }: Props) => {
    const { toggleEditTsismisModal, setSelectedTsismis } = useContextStore();
    const { deleteTsismis } = useDeleteTsismis();

    const onDelete = async () => {
        await deleteTsismis(data.id);
    }

    const onEdit = () => {
        setSelectedTsismis(data);
        toggleEditTsismisModal();
    }

    return (
        <Menu shadow="md" width={200} position='left-end'>
            <Menu.Target>
                <ActionIcon
                    size="xs"
                    className={classes.close}
                    variant='transparent'
                >
                    <IconDotsVertical />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={onEdit}
                    leftSection={<IconPencil />}>
                    Edit
                </Menu.Item>
                <Menu.Item
                    onClick={onDelete}
                    leftSection={<IconTrash />}>
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default Settings;