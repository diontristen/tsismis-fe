import TsismisInput from '.';
import { Modal } from '@mantine/core';
import classes from '@/components/TsismisInput/TsismisInput.module.css';
import { useContextStore } from '@/store/useContexStore';
const TsismisEditModal = () => {
    const { editTsismisModalOpened, selectedTsismis, toggleEditTsismisModal } = useContextStore();

    return (
        <Modal
            title='Modify your tsismis'
            opened={editTsismisModalOpened}
            onClose={toggleEditTsismisModal}
            classNames={{
                inner: classes.modalInner
            }}
        >
            {selectedTsismis && <TsismisInput
                initial={{
                    message: selectedTsismis?.message,
                    tags: selectedTsismis?.tags,
                    id: selectedTsismis?.id
                }}
                type='edit'
            />}
        </Modal>
    );
};

export default TsismisEditModal;