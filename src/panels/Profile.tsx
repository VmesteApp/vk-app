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
import {
  Icon28HelpCircleOutline,
  Icon28InfoCircleOutline,
  Icon28Notifications,
} from "@vkontakte/icons";

export const Profile: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Меню
      </PanelHeader>

      <Group header={<Header mode="secondary">Меню</Header>}>
        <SimpleCell expandable="auto" before={<Icon28Notifications />}>
          Уведомления
        </SimpleCell>
        <SimpleCell expandable="auto" before={<Icon28HelpCircleOutline />}>
          Тех. поддержка
        </SimpleCell>
        <SimpleCell expandable="auto" before={<Icon28InfoCircleOutline />}>
          О приложении, справки
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
