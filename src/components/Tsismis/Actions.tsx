import {
    Flex,
    Text
} from '@mantine/core';
import {
    IconHeart,
    IconHeartFilled,
    IconStar,
    IconStarFilled
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from '@/components/Tsismis/Tsismis.module.css';
import { useFavoriteTsimis, useLikeTsismis } from '@/hooks/useTsismis';
import { ITsismis } from '@/types/tsismis';


interface Props {
    data: ITsismis;
}

const Actions = ({ data }: Props) => {
    const { likeTsismis, unLikeTsismis } = useLikeTsismis();
    const { favoriteTsismis, unfavoriteTsismis } = useFavoriteTsimis();
    const [favorite, setFavorite] = useState<boolean>(data.hasFavorited);
    const [heart, setHeart] = useState<boolean>(data.hasLiked);

    const onFavorite = async () => {
        let success: boolean = false;
        if(favorite) {
            success = await unfavoriteTsismis(data.id);
        } else {
            success = await favoriteTsismis(data.id);
        }
        if(success) {
            setFavorite(el => !el);
        }
    }

    const onHeart = async () => {
        let success: boolean = false;
        if(heart) {
            success = await unLikeTsismis(data.id);
        } else {
            success = await likeTsismis(data.id);
        }
        if(success) {
            setHeart(el => !el);
        }
    }
    return (
        <Flex className={classes.action}>
            <Flex className={classes.tickContainer}>
                {!heart && <IconHeart
                    onClick={onHeart}
                    className={classes.unTick} />}
                {heart && <IconHeartFilled
                    onClick={onHeart}
                    className={classes.tick} />}
                <Text>{data.likes}</Text>
            </Flex>
            <Flex className={classes.tickContainer}>
                {!favorite && <IconStar
                    onClick={onFavorite}
                    className={classes.unTick} />}
                {favorite && <IconStarFilled
                    onClick={onFavorite}
                    className={classes.tick} />}
                <Text>{data.favorites}</Text>
            </Flex>
        </Flex>
    );
};

export default Actions;