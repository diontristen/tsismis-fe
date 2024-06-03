import {
    Anchor,
    Box,
    Divider,
    Flex,
    Text
} from "@mantine/core";
import LoginForm from "@/pages/Login/LoginForm";
import classes from '@/pages/Login/Login.module.css';
import Backdrop from "@/components/Common/Backdrop";
import BigLogo from "@/components/Common/BigLogo";
import LoginHeader from "@/components/Common/LoginHeader";

const Login = () => {
    return (
        <Box className={classes.wrapper}>
            <BigLogo />
            <Backdrop />
            <Flex className={classes.container}>
                <LoginHeader />
                <Text className={classes.message}>Enter the Gossip Zone</Text>
                <LoginForm />
                <Divider className={classes.divider} />
                <Text className={classes.signup}>Don't have an account yet? <Anchor href='/signup'>Sign up</Anchor></Text>
            </Flex>
        </Box>
    );
};

export default Login;