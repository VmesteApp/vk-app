import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const AdminPulseApplications: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        AdminPulseApplications
      </PanelHeader>
    </Panel>
  );
};
