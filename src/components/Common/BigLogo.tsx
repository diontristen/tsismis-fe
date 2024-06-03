import {
    Image,
} from "@mantine/core";
import bigLogo from '@/assets/backdrops/big-logo.svg';
import classes from '@/components/Common/styles/BigLogo.module.css';

const BigLogo = () => {
    return (
        <Image
            src={bigLogo}
            alt='Big Tsismis logo'
            className={classes.bigLogo}
        />
    );
};

export default BigLogo;