import TsismisInput from '.';
import { Modal } from '@mantine/core';
import classes from '@/components/TsismisInput/TsismisInput.module.css';
import { useContextStore } from '@/store/useContexStore';
const TsismisModal = () => {
    const { createTsismisModalOpened, toggleCreateTsismisModal } = useContextStore();
    
    return (
        <Modal
            title='Share a New Tsismis'
            opened={createTsismisModalOpened}
            onClose={toggleCreateTsismisModal}
            classNames={{
                inner: classes.modalInner
            }}
        >
            <TsismisInput
                type='create'
            />
        </Modal>
    );
};

export default TsismisModal;