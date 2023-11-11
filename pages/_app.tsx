import type {AppProps} from 'next/app'
import Head from "next/head";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {useState} from "react";
import {getCookie} from 'cookies-next';
import {GetServerSidePropsContext} from "next";
import {useColorScheme} from "@mantine/hooks";
import {ModalsProvider} from "@mantine/modals";
import {RouterTransition} from '@/components';
import "../styles/globals.css";
import {Notifications} from "@mantine/notifications";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

    const toggleColorScheme = (value?: ColorScheme): void =>
        setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

    return <>
        <Head>
            <title>Dashboard</title>
            <link rel="manifest" href="/site.webmanifest"/>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            <meta name="description"
                  content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"/>
        </Head>

        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme,
                    fontFamily: 'Manrope, sans-serif',
                    headings: {
                        fontFamily: 'Manrope, sans-serif'
                    }
                }}
            >
                <ModalsProvider>
                    <RouterTransition/>
                    <Notifications/>
                    <Component {...pageProps} />
                </ModalsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    </>
}

App.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({
    // get color scheme from cookie
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
