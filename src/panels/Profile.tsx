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
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon28Notifications, Icon28UserCircleOutline } from "@vkontakte/icons";

export const Profile: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Профиль
      </PanelHeader>

      <Group header={<Header mode="secondary">Меню</Header>}>
        <SimpleCell expandable="auto" before={<Icon28UserCircleOutline />}>
          Личные данные
        </SimpleCell>
        <SimpleCell expandable="auto" before={<Icon28Notifications />}>
          Уведомления
        </SimpleCell>
      </Group>

      <Group header={<Header mode="secondary">Настройки</Header>}>
        <SimpleCell Component="label" after={<Switch defaultChecked />}>
          Темная тема
        </SimpleCell>
        <SimpleCell Component="label" after={<Switch />}>
          Push-уведомления
        </SimpleCell>
      </Group>
    </Panel>
  );
};
