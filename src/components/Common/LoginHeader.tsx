import {
    Flex,
    Image,
    Text
} from '@mantine/core';
import classes from '@/components/Common/styles/LoginHeader.module.css';
import Theme from '@/components/Theme';
const LoginHeader = () => {
    return (
        <Flex className={classes.header}>
            <Theme/>
            <Image
                src='/tsismis.svg'
                alt='Company Logo'
                className={classes.companyLogo}
                mt='1rem'
            />
            <Text className={classes.companyName}><Text component="span" inherit className={classes.companySpecial}>T</Text>sismis</Text>
            <Text className={classes.tagline}>Gossip you cannot miss</Text>
        </Flex>
    );
};

export default LoginHeader;