import { useState } from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Alert, Button, PasswordInput, Stack, Text} from '@mantine/core';
import { useForm } from '@mantine/form';
import { isEmpty } from '@/utils/helper';
import { useUpdatePassword } from '@/hooks/useUser';
import classes from '@/pages/Settings/Settings.module.css';

const updateSchema = z.object({
    oldPassword: z.string()
        .min(1, { message: 'Old password is required' }),
    newPassword: z.
        string()
        .min(7, { message: 'New password should atleast 7 characters' }),
    confirmPassword: z.
        string()
        .min(1, { message: 'Confirm password is required' }),
}).refine(data => {
    return !(data.newPassword !== data.confirmPassword)
}, { message: 'New password and confirm new password do not match', path: ['confirmPassword'] })



const UpdatePasswordForm = () => {
    const { updatePassword, error, loading, resetError } = useUpdatePassword();
    const [showSuccess, setShowSucess] = useState<boolean>(false);
    const updateForm = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validate: zodResolver(updateSchema),
        onValuesChange() {
            if(!isEmpty(error)) {
                resetError();
            }
        },
    });

    const onUpdate = async (values: typeof updateForm.values) => {
        const success = await updatePassword(values.oldPassword, values.newPassword);
        if(!success) {
            setShowSucess(false);
            return;
        } else {
            setShowSucess(true);
            updateForm.reset();
        }
    }

    return (
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
                    You have successfuly updated your password.
                </Text>
            </Alert>}
            <Stack>
                <PasswordInput
                    label='Old password'
                    placeholder='Enter your old password'
                    {...updateForm.getInputProps('oldPassword')}
                />
                <PasswordInput
                    label='New password'
                    placeholder='At least 7 characters'
                    {...updateForm.getInputProps('newPassword')}
                />
                <PasswordInput
                    label='Confirm new password'
                    placeholder='At least 7 characters'
                    {...updateForm.getInputProps('confirmPassword')}
                />
                <Button
                    type='submit'
                    loading={loading}
                    disabled={loading}
                >
                    Update
                </Button>
            </Stack>
        </form>
    );
};

export default UpdatePasswordForm;