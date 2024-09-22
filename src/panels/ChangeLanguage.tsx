import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";

export const ChangeLanguage: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t, i18n } = useTranslation();

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    routeNavigator.back();
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("changeLanguage.title")}
      </PanelHeader>

      <Group>
        {LANGUAGES.map((lang) => (
          <SimpleCell
            key={lang.code}
            onClick={() => switchLang(lang.code)}
            expandable="auto"
          >
            {lang.name}
          </SimpleCell>
        ))}
      </Group>
    </Panel>
  );
};
