import Layout from '@/components/Layout';
import {
    Box,
    Text
} from '@mantine/core';
import classes from '@/pages/Settings/Settings.module.css';
import UpdatePasswordForm from './UpdatePasswordForm';
const Settings = () => {
    return (
        <Layout page='Settings'>
            <Box className={classes.container}>
                <Text className={classes.title}>Your account</Text>
                <Text>Update your password</Text>
                <UpdatePasswordForm/>
            </Box>
        </Layout>
    );
};

export default Settings;