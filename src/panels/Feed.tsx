import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  CardGrid,
  Search,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24Filter } from "@vkontakte/icons";
import { PulseCard } from "../components";
import { mockedPulses } from "../mocks";

export const Feed: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Лента
      </PanelHeader>

      <Group separator="hide">
        <Search
          value={undefined}
          after={null}
          onChange={undefined}
          icon={<Icon24Filter />}
          onIconClick={() => {
            return false;
          }}
        />
      </Group>

      <Group>
        <CardGrid size="l">
          {mockedPulses.map((pulse) => (
            <PulseCard key={pulse.id} {...pulse} onPress={() => {}} />
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
};
