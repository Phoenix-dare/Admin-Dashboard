import React from "react";
import {Anchor, Container, Stack} from "@mantine/core"
import Head from "next/head";
import {AppLayout} from "@/layout";
import {KanbanBoard, PageHeader} from "@/components";
import {PATH_DASHBOARD} from "@/routes";

const items = [
    {title: 'Dashboard', href: PATH_DASHBOARD.default},
    {title: 'Tasks', href: '#'},
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

function Tasks() {
    return (
        <>
            <Head>
                <title>Tasks</title>
            </Head>
            <AppLayout>
                <Container fluid>
                    <Stack spacing="lg">
                        <PageHeader title="Tasks" breadcrumbItems={items}/>
                        <KanbanBoard/>
                    </Stack>
                </Container>
            </AppLayout>
        </>
    );
}

export default Tasks
