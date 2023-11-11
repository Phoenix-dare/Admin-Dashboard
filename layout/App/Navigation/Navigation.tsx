import {
  ActionIcon,
  Box,
  Code,
  Flex,
  Group,
  Navbar,
  NavbarProps,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconAdjustmentsFilled,
  IconAlertOctagon,
  IconAppWindow,
  IconBook2,
  IconBriefcase,
  IconCalendar,
  IconFileInvoice,
  IconLifebuoy,
  IconList,
  IconListDetails,
  IconUserShield,
  IconX,
} from "@tabler/icons-react";
import useStyles from "./Navigation.styles";
import { Logo, UserProfileButton } from "@/components";
import {
  PATH_AUTH,
  PATH_CALENDAR,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_ERROR,
  PATH_INVOICES,
  PATH_ORDERS,
  PATH_PAGES,
  PATH_PROJECTS,
  PATH_TASKS,
} from "@/routes";
import UserProfileData from ".././../../mocks/UserProfile.json";
import { LinksGroup } from "@/layout/App/Navigation/Links/Links";
import { useMediaQuery } from "@mantine/hooks";
import useTranslation from "next-translate/useTranslation";

type NavigationProps = { onClose: () => void } & Omit<NavbarProps, "children">;

const Navigation = ({ onClose, ...others }: NavigationProps) => {
  const { t, lang } = useTranslation("common");

  const mockdata = [
    {
      title: t("pages"),
      links: [
        {
          label: t("dashboard"),
          icon: IconAdjustmentsFilled,
          links: [
            { label: t("default"), link: PATH_DASHBOARD.default },
            { label: t("analytics"), link: PATH_DASHBOARD.analytics },
            { label: t("SaaS"), link: PATH_DASHBOARD.saas },
          ],
        },
        {
          label: t("pages"),
          icon: IconAppWindow,
          links: [
            { label: t("profile"), link: PATH_PAGES.profile },
            { label: t("settings"), link: PATH_PAGES.settings },
            { label: t("pricing"), link: PATH_PAGES.pricing },
            { label: t("chat"), link: PATH_PAGES.chat },
            { label: t("blankpage"), link: PATH_PAGES.blank },
          ],
        },
        { label: t("projects"), icon: IconBriefcase, link: PATH_PROJECTS.root },
        { label: t("orders"), icon: IconListDetails, link: PATH_ORDERS.root },
        {
          label: t("invoices"),
          icon: IconFileInvoice,
          links: [
            { label:t("list"), link: PATH_INVOICES.invoices.all },
            { label: t("details"), link: PATH_INVOICES.invoices.sample },
          ],
        },
        { label: t("tasks"), icon: IconListDetails, link: PATH_TASKS.root },
        { label: t("calendar"), icon: IconCalendar, link: PATH_CALENDAR.root },
        {
          label: t("auth"),
          icon: IconUserShield,
          links: [
            { label: t("sign_in"), link: PATH_AUTH.signin },
            { label: t("sign_up"), link: PATH_AUTH.signup },
            { label: t("reset_password"), link: PATH_AUTH.passwordReset },
          ],
        },
        {
          label: t("errors"),
          icon: IconAlertOctagon,
          links: [
            { label: "403 Page", link: PATH_ERROR.error403 },
            { label: "404 Page", link: PATH_ERROR.error404 },
            { label: "500 Page", link: PATH_ERROR.error500 },
          ],
        },
      ],
    }
  ];
  const { classes, theme } = useStyles();
  const tablet_match = useMediaQuery("(max-width: 768px)");

  const links = mockdata.map((m) => (
    <Box pl={0} mb="md" key={m.title}>
      <Text tt="uppercase" size="xs" pl="md" fw={500} mb="sm" c="gray.2">
        {m.title}
      </Text>
      {m.links.map((item) => (
        <LinksGroup {...item} key={item.label} />
      ))}
    </Box>
  ));

  return (
    <Navbar
      width={{ sm: 300, md: 400 }}
      px="md"
      className={classes.navbar}
      {...others}
    >
      <Navbar.Section className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm">
          <Group position="apart" sx={{ flex: tablet_match ? "auto" : 1 }}>
            <Text>Admin Dashboard</Text>
                     </Group>
          {tablet_match && (
            <ActionIcon onClick={onClose} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          )}
        </Flex>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserProfileButton
          email={UserProfileData.email}
          image={UserProfileData.avatar}
          name={UserProfileData.name}
          sx={{ color: theme.white }}
        />
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;
