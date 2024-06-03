import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
    Alert,
    Anchor,
    Button,
    PasswordInput,
    Stack,
    TextInput,
    Text
} from '@mantine/core';
import classes from '@/pages/Signup/Signup.module.css';
import { useForm } from '@mantine/form';
import { useSignup } from '@/hooks/useAuth';
import { isEmpty } from '@/utils/helper';
import { LOGIN_ROUTE } from '@/route/routes';
import { useState } from 'react';

const registerSchema = z.object({
    username: z.
        string()
        .min(1, { message: 'Username is required' })
        .min(6, { message: 'Username should be atleast 6 characters' }),
    displayName: z.
        string()
        .min(1, { message: 'Display name should be atleast 6 characters' })
        .max(15, { message: 'Display name should be less than 16 characters' }),
    password: z.
        string()
        .min(7, { message: 'Password should atleast 7 characters' })
        .max(64, { message: 'Password should be less than 65 characters' }),
    confirmPassword: z.
        string()
        .min(1, { message: 'Confirm password is required' }),
}).refine(data => {
    return !(data.password !== data.confirmPassword)
}, { message: 'Password and confirm password do not match', path: ['confirm_password'] })


const SignupForm = () => {
    const { signup, resetError, loading, error } = useSignup();
    const [showSuccess, setShowSucess] = useState<boolean>(false);
    const registerForm = useForm({
        initialValues: {
            username: '',
            displayName: '',
            password: '',
            confirmPassword: ''
        },
        validate: zodResolver(registerSchema),
        onValuesChange() {
            if(!isEmpty(error)) {
                resetError();
            }
        },
    });

    const onSignup = async (values: typeof registerForm.values) => {
        const success = await signup(values.username, values.displayName, values.password);
        if(!success) {
            setShowSucess(false);
            return;
        } else {
            setShowSucess(true);
            registerForm.reset();
        }
    }

    return (
        <form
            className={classes.form}
            onSubmit={registerForm.onSubmit(onSignup)}
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
                    You have been successfully registered. Start sharing some gossip!
                </Text>
                <Anchor className={classes.signIn} href={LOGIN_ROUTE}>Sign in now</Anchor>
            </Alert>}
            <Stack>
                <TextInput
                    placeholder='Username'
                    {...registerForm.getInputProps('username')}
                />
                <TextInput
                    placeholder='Display name'
                    {...registerForm.getInputProps('displayName')}
                />
                <PasswordInput
                    placeholder='Password'
                    {...registerForm.getInputProps('password')}
                />
                <PasswordInput
                    placeholder='Confirm Password'
                    {...registerForm.getInputProps('confirmPassword')}
                />
                <Button
                    type='submit'
                    loading={loading}
                    disabled={loading}
                >
                    Sign up
                </Button>
            </Stack>
        </form>
    );
};

export default SignupForm;