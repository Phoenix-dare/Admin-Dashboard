import {
    Box,
    Burger,
    Button,
    Center,
    Container,
    Drawer,
    Group,
    Header,
    Menu,
    rem,
    ScrollArea,
    Text
} from '@mantine/core';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import {IconChevronDown} from '@tabler/icons-react';
import useStyles from "./HeaderNav.styles";
import {PATH_DASHBOARD, PATH_DOCS} from "@/routes";
import {Logo} from "@/components";

const MOCK_DATA = [
    {
        "link": PATH_DASHBOARD.default,
        "label": "live preview"
    },
    {
        "link": PATH_DOCS.root,
        "label": "documentation"
    },
    {
        "link": "mailto:kelvin.kiprop96@gmail.com",
        "label": "support",
    },
]

const HEADER_HEIGHT = rem(60);

const HeaderNav = () => {
    const {classes, theme} = useStyles();
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const tablet_match = useMediaQuery('(max-width: 768px)');

    const items = MOCK_DATA.map((link) => {
        return (
            <a
                key={link.label}
                href={link.link}
                target="_blank"
                className={classes.link}
            >
                {link.label}
            </a>
        );
    });

    return (
        <Box>
            <Header height={HEADER_HEIGHT}>
                
            </Header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Menu"
                className={classes.hiddenDesktop}
                zIndex={1000000}
                transitionProps={{
                    transition: tablet_match ? 'slide-up' : 'slide-left',
                }}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    {items}
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default HeaderNav
