import { useNavigate } from 'react-router-dom';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
    Alert,
    Button,
    PasswordInput,
    Stack,
    TextInput,
    Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLogin } from '@/hooks/useAuth';
import { isEmpty } from '@/utils/helper';
import classes from '@/pages/Login/Login.module.css';

const loginSchema = z.object({
    username: z.
        string()
        .min(1, { message: 'Username is required' }),
    password: z.
        string()
        .min(1, { message: 'Password is required' }),
});


const LoginForm = () => {
    const navigate = useNavigate();
    const { login, resetError, loading, error } = useLogin();
    const loginForm = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: zodResolver(loginSchema),
        onValuesChange() {
            if(!isEmpty(error)) {
                resetError();
            }
        },
    });

    const onLogin = async (values: typeof loginForm.values) => {
        const success = await login(values.username, values.password);
        if(!success) {
            return;
        }
        navigate('/');
    }

    return (
        <form
            className={classes.form}
            onSubmit={loginForm.onSubmit(onLogin)}
        >
            {!isEmpty(error) && <Alert className={classes.alert}>
                <Text>
                    {error}
                </Text>
            </Alert>}
            <Stack>
                <TextInput
                    placeholder='Username'
                    {...loginForm.getInputProps('username')}
                />
                <PasswordInput
                    placeholder='Password'
                    {...loginForm.getInputProps('password')}
                />
                <Button
                    type='submit'
                    loading={loading}
                    disabled={loading}
                >
                    Sign in
                </Button>
            </Stack>
        </form>
    );
};

export default LoginForm;