import { ActionIcon, Alert, Anchor, Button, Drawer, Loader, PasswordInput, TagsInput, TextInput, Textarea, createTheme } from "@mantine/core";
import classes from '@/styles/Component.module.css';
export const theme = createTheme({
    colors: {
        primary: [
            '#ffbc6b', // 0
            '#ffb152', // 1
            '#ffa539', // 2
            '#ffa539', // 3
            '#ff9a21', // 4
            '#ff8f08', // 5
            '#e68107', // 6
            '#cc7206', // 7
            '#b36406', // 8
            '#995605', // 9
        ],
        secondary: [
            '#ffac80', // 0
            '#ff9b66', // 1
            '#ff8b4d', // 2
            '#ff7a33', // 3
            '#ff6a1a', // 4
            '#ff5900', // 5
            '#e65000', // 6
            '#cc4700', // 7
            '#b33e00', // 8
            '#993500', // 9
        ],
        dark: [
            '#949494', // 0
            '#7f7f7f', // 1
            '#696969', // 2
            '#545454', // 3
            '#3e3e3e', // 4
            '#292929', // 5
            '#252525', // 6
            '#212121', // 7
            '#1d1d1d', // 8
            '#191919', // 9
        ],
        white: [
            '#f9f9f9', // 0
            '#f7f7f7', // 1
            '#f6f6f6', // 2
            '#f5f5f5', // 3
            '#f3f3f3', // 4
            '#f2f2f2', // 5
            '#dadada', // 6
            '#c2c2c2', // 7
            '#a9a9a9', // 8
            '#919191', // 9
        ],
    },
    primaryShade: 5, // Default primary shade
    defaultRadius: 8,
    fontFamily: 'Poppins, sans-serif',
    focusRing: 'never',
    shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
        md: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },
    fontSizes: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
    },
    headings: {
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        sizes: {
            h1: { fontSize: '3rem' },
            h2: { fontSize: '2.25rem' },
            h3: { fontSize: '1.875rem' },
            h4: { fontSize: '1.5rem' },
            h5: { fontSize: '1.25rem' },
            h6: { fontSize: '1rem' }
        },
    },
    breakpoints: {
        xs: '480px',
        sm: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1440px'
    },
    components: {
        TextInput: TextInput.extend({
            classNames: {
                input: classes.textInput
            }
        }),
        PasswordInput: PasswordInput.extend({
            classNames: {
                input: classes.textInput,
                visibilityToggle: classes.actionIcon
            }  
        }),
        Textarea: Textarea.extend({
            classNames: {
                input: classes.textInput
            }
        }),
        TagsInput: TagsInput.extend({
            classNames: {
                input: classes.textInput,
                pill: classes.tagsPill
            }
        }),
        Button: Button.extend({
            classNames: {
                root: classes.buttonRoot,
            }
        }),
        Anchor: Anchor.extend({
            classNames: {
                root: classes.anchor
            }
        }),
        ActionIcon: ActionIcon.extend({
            classNames: {
                root: classes.actionIcon
            }
        }),
        Alert: Alert.extend({
            classNames: {
                root: classes.alert,
                message: classes.alertMessage
            }
        }),
        Drawer: Drawer.extend({
            classNames: {
                inner: classes.drawerInner
            }
        }),
        Loader: Loader.extend({
            classNames: {
                root: classes.loader
            }
        })
    }
});