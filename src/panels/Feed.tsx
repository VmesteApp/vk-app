import { FC, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  CardGrid,
  PanelSpinner,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { PulseCard } from "../components";
import { useTranslation } from "react-i18next";
import { IPulse } from "../types";
import api from "../network";

export const Feed: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();

  const [feed, setFeed] = useState<IPulse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const response = await api.get<IPulse[]>("/content/feed");

        if (response.status === 200) {
          setFeed(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("feed.title")}
      </PanelHeader>

      {loading ? (
        <PanelSpinner />
      ) : (
        <Group>
          <CardGrid size="l">
            {feed.map((pulse) => (
              <PulseCard
                key={pulse.id}
                pulse={pulse}
                onPress={() =>
                  routeNavigator.push(`/pulse/preview/${pulse.id}`)
                }
              />
            ))}
          </CardGrid>
        </Group>
      )}
    </Panel>
  );
};
