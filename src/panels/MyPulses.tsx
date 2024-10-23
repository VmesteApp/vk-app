import { FC, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  Group,
  Tabs,
  HorizontalScroll,
  TabsItem,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { mockedApplications } from "../mocks";
import { useTranslation } from "react-i18next";
import { Icon28AddOutline } from "@vkontakte/icons";
import { ApplicationsList, PulsesList } from "../components";
import { IPulse } from "../types";
import api from "../network";

type TabsType = "pulses" | "applications";

const tabs: { title: string; tab: TabsType }[] = [
  {
    title: "myPulses.tabs.pulses",
    tab: "pulses",
  },
  {
    title: "myPulses.tabs.applications",
    tab: "applications",
  },
];

export const MyPulses: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const [selectedTabs, setSelectedTabs] = useState<TabsType>("pulses");
  const routeNavigator = useRouteNavigator();

  const [myPulses, setMyPulses] = useState<IPulse[]>([]);

  useEffect(() => {
    const fetchMyPulses = async () => {
      try {
        const response = await api.get<{ pulses: IPulse[] }>("/content/pulses");

        if (response.status === 200) {
          setMyPulses(response.data.pulses);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPulses();
  }, []);

  const handlePressPulse = (pulse: IPulse) => {
    routeNavigator.push(`/pulse/${pulse.id}`);
  };

  const handleFindPulses = () => {
    routeNavigator.push("/");
  };

  const handleCreatePulse = () => {
    routeNavigator.push("/pulse/create");
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<Icon28AddOutline onClick={handleCreatePulse} />}>
        {t("myPulses.title")}
      </PanelHeader>

      <Tabs
        mode={"default"}
        layoutFillMode={"auto"}
        withScrollToSelectedTab
        scrollBehaviorToSelectedTab="center"
      >
        <HorizontalScroll arrowSize="m">
          {tabs.map((tab) => (
            <TabsItem
              key={tab.tab}
              selected={selectedTabs === tab.tab}
              disabled={false}
              onClick={() => setSelectedTabs(tab.tab)}
            >
              {t(tab.title)}
            </TabsItem>
          ))}
        </HorizontalScroll>
      </Tabs>

      <Group>
        {selectedTabs === "pulses" ? (
          <PulsesList
            data={myPulses}
            handlePressPulse={handlePressPulse}
            handleFoundPulses={handleFindPulses}
            handleCreatePulse={handleCreatePulse}
          />
        ) : (
          <ApplicationsList
            data={mockedApplications}
            handleFindPulses={handleFindPulses}
          />
        )}
      </Group>
    </Panel>
  );
};
