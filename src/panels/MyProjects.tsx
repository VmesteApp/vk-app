import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Placeholder,
} from "@vkontakte/vkui";
import { Icon28ServicesOutline } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const MyProjects: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Мои Импульсы
      </PanelHeader>

      <Group style={{ height: "1000px" }}>
        <Placeholder
          icon={<Icon28ServicesOutline width={56} height={56} />}
        ></Placeholder>
      </Group>
    </Panel>
  );
};
