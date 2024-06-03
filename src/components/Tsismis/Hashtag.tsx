import { Flex, Anchor } from '@mantine/core';
import classes from '@/components/Tsismis/Tsismis.module.css';

interface Props {
    tags: string[]
}

const Hashtag = ({ tags }: Props) => {
    return (
        <Flex className={classes.hashtagContainer}>
            {tags && tags.map((item: string) => (
                <Anchor key={item}>#{item}</Anchor>
            ))}
        </Flex>
    );
};

export default Hashtag;