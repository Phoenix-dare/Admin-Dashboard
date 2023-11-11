import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from "react";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import useStyles from "./LanguagePicker.styles";

const data =[
    {
      "label": "English",
      "value": "en"
    },
    {
      "label": "German",
      "value": "de"
    },
    {
      "label": "Polish",
      "value": "pl"
    },
    {
      "label": "Croatian",
      "value": "hr"
    },
    {
      "label": "Swedish",
      "value": "sv"
    },
    {
      "label": "Dutch",
      "value": "nl"
    },
    {
      "label": "Belgian",
      "value": "be"
    },
    {
      "label": "Russian",
      "value": "ru"
    }
]

type LanguagePickerProps = {
    type: "collapsed" | "expanded"
}

type LanguageItem = {
    label: string;
    value: string;
};

const LanguagePicker = ({type}: LanguagePickerProps) => {
    const { t,lang } = useTranslation();
    const router = useRouter();
    const [opened, setOpened] = useState(false);
    const {classes} = useStyles({opened});
    const [selected, setSelected] = useState(data.find(item => item.value === lang) || data[0]);

    const handleLanguageChange = (item: LanguageItem) => {
        setSelected(item);
        router.push(router.pathname, router.asPath, { locale: item.value });
    };

    const items = data.map((item) => (
        <Menu.Item
            onClick={() => handleLanguageChange(item)}
            key={item.label}
        >
            {item.label}
        </Menu.Item>
    ));

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="sm"
            withinPortal
            width={200}
        >
            <Menu.Target>
                <UnstyledButton className={classes.control}>
                    <Group spacing="xs">
                        <span className={classes.label}>Change language: {selected.label}</span>
                        {type === "expanded" && <IconChevronDown size="1rem" className={classes.icon} stroke={1.5}/>}
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    );
}

export default LanguagePicker;
