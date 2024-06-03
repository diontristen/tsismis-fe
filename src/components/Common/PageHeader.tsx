import {
    Flex,
    Text
 } from '@mantine/core';
import classes from '@/components/Common/styles/PageHeader.module.css';
import Theme from '../Theme';
interface Props {
    page: string;
}

const PageHeader = ({ page }: Props) => {
    return (
        <Flex className={classes.container}>
            <Text>{page}</Text>
            <Theme/>
        </Flex>
    );
};

export default PageHeader;