import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { FC } from "react";

export const CreatePulse: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Создать Импульс
      </PanelHeader>
    </Panel>
  );
};
