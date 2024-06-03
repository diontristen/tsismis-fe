import {
    Box,
    Flex,
    Text,
    Divider,
    Anchor
} from '@mantine/core';
import classes from '@/pages/Signup/Signup.module.css';
import SignupForm from '@/pages/Signup/SignupForm';
import BigLogo from '@/components/Common/BigLogo';
import Backdrop from '@/components/Common/Backdrop';
import LoginHeader from '@/components/Common/LoginHeader';

const Signup = () => {
    return (
        <Box className={classes.wrapper}>
            <BigLogo />
            <Backdrop />
            <Flex className={classes.container}>
                <LoginHeader/>
                <Text className={classes.message}>Join the Gossip Zone</Text>
                <SignupForm/>
                <Divider className={classes.divider} />
                <Text className={classes.signup}>Already have an account? <Anchor href='/login'>Sign in</Anchor></Text>
            </Flex>
        </Box>
    );
};

export default Signup;