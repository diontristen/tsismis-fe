import { Box } from '@mantine/core';
import cx from 'clsx';
import classes from '@/components/Common/styles/Backdrop.module.css';

const Backdrop = () => {
    return (
        <>
            <Box
                className={cx(classes.box, classes.topBox)}
            />
            <Box
                className={cx(classes.box, classes.secondBox)}
            />
            <Box
                className={cx(classes.box, classes.thirdBox)}
            />
            <Box
                className={cx(classes.box, classes.fourthBox)}
            />
            <Box
                className={cx(classes.box, classes.fifthBox)}
            />
            <Box
                className={cx(classes.box, classes.sixthBox)}
            />
            <Box
                className={cx(classes.box, classes.bottomBox)}
            />
        </>
    );
};

export default Backdrop;