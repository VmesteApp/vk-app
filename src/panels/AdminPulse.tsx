import { FC } from "react";
import { Panel, PanelHeader, NavIdProps } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { Icon28AddOutline } from "@vkontakte/icons";

export const AdminPulse: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<Icon28AddOutline onClick={() => routeNavigator.back()} />}
      >
        AdminPulse
      </PanelHeader>
    </Panel>
  );
};
