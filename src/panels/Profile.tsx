import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Header,
  SimpleCell,
  Switch,
  Link,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Icon28DocumentListOutline,
  Icon28HelpCircleOutline,
  Icon28InfoCircleOutline,
  Icon28Notifications,
} from "@vkontakte/icons";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";

const getLanguageNameByCode = (code: string) => {
  const lang = LANGUAGES.find((lang) => lang.code === code);
  return lang ? lang.name : "";
};

export const Profile: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t, i18n } = useTranslation();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("menu.title")}
      </PanelHeader>

      <Group
        header={<Header mode="secondary">{t("menu.subtitles.menu")}</Header>}
      >
        <SimpleCell expandable="auto" before={<Icon28Notifications />}>
          {t("menu.menu.notifications")}
        </SimpleCell>
        <Link href="mailto:vmesteapp@gmail.com">
          <SimpleCell expandable="auto" before={<Icon28HelpCircleOutline />}>
            {t("menu.menu.techSupport")}
          </SimpleCell>
        </Link>
        <SimpleCell expandable="auto" before={<Icon28InfoCircleOutline />}>
          {t("menu.menu.aboutApp")}
        </SimpleCell>
        <SimpleCell expandable="auto" before={<Icon28DocumentListOutline />}>
          {t("menu.menu.certs")}
        </SimpleCell>
      </Group>

      <Group
        header={
          <Header mode="secondary">{t("menu.subtitles.settings")}</Header>
        }
      >
        <SimpleCell
          onClick={() => routeNavigator.push("/change-language")}
          expandable="auto"
          indicator={getLanguageNameByCode(i18n.language)}
        >
          {t("menu.settings.lang")}
        </SimpleCell>
        <SimpleCell Component="label" after={<Switch defaultChecked />}>
          {t("menu.settings.darkTheme")}
        </SimpleCell>
        <SimpleCell Component="label" after={<Switch />}>
          {t("menu.settings.pushNotifications")}
        </SimpleCell>
      </Group>
    </Panel>
  );
};
