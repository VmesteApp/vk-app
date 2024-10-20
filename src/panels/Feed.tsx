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
import { useTranslation } from "react-i18next";

export const Feed: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("feed.title")}
      </PanelHeader>

      <Group separator="hide">
        <Search
          value={undefined}
          after={null}
          onChange={undefined}
          placeholder={t("feed.search")}
          icon={<Icon24Filter />}
          onIconClick={() => {
            return false;
          }}
        />
      </Group>

      <Group>
        <CardGrid size="l">
          {mockedPulses.map((pulse) => (
            <PulseCard
              key={pulse.id}
              {...pulse}
              onPress={() => routeNavigator.push(`/pulse/preview/${pulse.id}`)}
            />
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
};
