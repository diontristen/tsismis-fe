import { useEffect, useState } from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Alert, Button, Modal, Stack, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useProfileStore } from '@/store/useProfileStore';
import classes from '@/components/Profile/Profile.module.css';
import { UseUpdateProfile } from '@/hooks/useProfile';
import { isEmpty } from '@/utils/helper';

const updateSchema = z.object({
    displayName: z.
        string()
        .min(1, { message: 'Display name should be atleast 6 characters' })
        .max(15, { message: 'Display name should be less than 16 characters' }),
    description: z.
        string()
        .max(50, { message: 'Description should be less than 50 characters' }),
})

const EditProfileModal = () => {
    const { editProfileOpened, toggleEditProfileModal } = useProfileStore();
    const { profile, loading, error, resetError, updateUserProfile } = UseUpdateProfile();
    const [showSuccess, setShowSucess] = useState<boolean>(false);
    const updateForm = useForm({
        initialValues: {
            displayName: '',
            description: '',
        },
        validate: zodResolver(updateSchema),
        onValuesChange() {
            if(!isEmpty(error)) {
                resetError();
            }
        },
    });


    useEffect(() => {
        if(profile) {
            updateForm.setFieldValue('displayName', profile.displayName);
            updateForm.setFieldValue('description', profile.description ?? '');
        }
    }, [profile]);

    const onUpdate = async (values: typeof updateForm.values) => {
        const success = await updateUserProfile(values.displayName, values.description);
        if(!success) {
            setShowSucess(false);
            return;
        } else {
            setShowSucess(true);
        }
    }


    return (
        <Modal
            title='Edit your profile'
            opened={editProfileOpened}
            onClose={toggleEditProfileModal}
            classNames={{
                inner: classes.modalInner
            }}
        >
            <form
                onSubmit={updateForm.onSubmit(onUpdate)}
            >
                {!isEmpty(error) && <Alert className={classes.alert}>
                    <Text>
                        {error}
                    </Text>
                </Alert>}
                {showSuccess && <Alert classNames={{
                    root: classes.success,
                }}>
                    <Text mb='0.5rem'>
                        You have successfuly updated your profile
                    </Text>
                </Alert>}
                <Stack>
                    <TextInput
                        label='Display name'
                        placeholder='Marites'
                        {...updateForm.getInputProps('displayName')}
                    />
                    <TextInput
                        label='Description'
                        placeholder='Solid certified marites'
                        {...updateForm.getInputProps('description')}
                    />
                    <Button
                        type='submit'
                        loading={loading}
                        disabled={loading}
                    >
                        Save Profile
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default EditProfileModal;