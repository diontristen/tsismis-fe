import { useState } from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
    Button,
    Flex,
    TagsInput,
    Textarea,
    Text,
    ActionIcon,
    Image,
    Box
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconReload } from '@tabler/icons-react';
import { useUser } from '@/hooks/useUser';
import { usePostTsismis, useUpdateTsimis } from '@/hooks/useTsismis';
import classes from '@/components/TsismisInput/TsismisInput.module.css';
import { useContextStore } from '@/store/useContexStore';
import { isEmpty } from '@/utils/helper';

interface Props {
    initial?: {
        message: string;
        tags: string[];
        id: string;
    },
    type: 'create' | 'edit'
}

const MAX_COUNT = 255;

const tsismisScehma = z.object({
    message: z.
        string()
        .min(1, { message: 'Tsismis cannot be empty' })
        .max(255, { message: 'Maximum number of characters should be less than 255' })
        .refine(value => !value.includes('\n'), {
            message: "Tsismis should not contain newline characters",
        }),
    tags: z
        .array(z.string())
        .max(5, { message: 'You can have at most 5 tags' })
        .refine(tags => tags.every(tag => tag.length <= 15), {
            message: "Each tag should be less than 15 characters long",
        }),
});


const TsismisInput = ({ initial, type }: Props) => {
    const { user } = useUser();
    const { postTsismis } = usePostTsismis();
    const { updateTsismis } = useUpdateTsimis();
    const [charCount, setCharCount] = useState<number>(initial?.message?.length ?? 0);
    const { createTsismisModalOpened, editTsismisModalOpened, toggleEditTsismisModal, toggleCreateTsismisModal } = useContextStore();

    const tsismisForm = useForm({
        initialValues: {
            message: initial?.message ?? '',
            tags: initial?.tags ?? []
        },
        validate: zodResolver(tsismisScehma),
        onValuesChange(values: any) {
            if(values.message) {
                let value = values.message;
                if(values.message.includes('\n')) {
                    value = values.message.replace(/\n/g, '');
                }
                setCharCount(value.length);
                tsismisForm.setFieldValue('message', value);
            }
        },
    });


    const onReset = () => {
        tsismisForm.setFieldValue('message', '');
        setCharCount(0);
    }

    const onSubmit = (values: typeof tsismisForm.values) => {
        if(type === 'create') {
            onCreate(values);
            return;
        }
        if(type === 'edit') {
            onEdit(values);
            return;
        }
    }

    const onCreate = async (values: typeof tsismisForm.values) => {
        const success = await postTsismis(values.message, values.tags);
        if(!success) {
            return;
        }
        if(createTsismisModalOpened) {
            toggleCreateTsismisModal();
        }
        tsismisForm.reset();
    }

    const onEdit = async (values: typeof tsismisForm.values) => {
        if(!initial || isEmpty(initial?.id)) {
            return;
        }
        const success = await updateTsismis(initial?.id, values.message, values.tags);
        if(!success) {
            return;
        }
        if(editTsismisModalOpened) {
            toggleEditTsismisModal();
        }
        tsismisForm.reset();
    }


    return (
        <form className={classes.container}
            onSubmit={tsismisForm.onSubmit(onSubmit)}
        >
            <Flex className={classes.post}>
                <Flex>
                    <Image className={classes.user} src={user?.avatar} />
                </Flex>
                <Box
                    className={classes.input}
                >
                    <Textarea
                        className={classes.textArea}
                        autosize
                        minRows={5}
                        maxRows={10}
                        placeholder='Share your latest tsismis...'
                        {...tsismisForm.getInputProps('message')}
                    />
                    <Flex className={classes.textAreaFooter}>
                        <Text data-max={charCount >= MAX_COUNT} className={classes.counter}>{charCount}/{MAX_COUNT}</Text>
                        <ActionIcon
                            variant='transparent'
                            className={classes.reset}
                            onClick={onReset}
                        >
                            <IconReload />
                        </ActionIcon>
                    </Flex>
                    <TagsInput
                        label="Hashtag"
                        placeholder="Separate each hashtag by a comman (,)"
                        className={classes.hashtag}
                        clearable
                        maxTags={5}
                        {...tsismisForm.getInputProps('tags')}
                    />
                </Box>
            </Flex>
            <Button className={classes.cta}
                type='submit'
            >
                {type === 'create' ? 'New Tsismis' : 'Update Tsismis'}
            </Button>
        </form>
    );
};

export default TsismisInput;