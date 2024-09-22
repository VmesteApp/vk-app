import { FC, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Tabs,
  HorizontalScroll,
  TabsItem,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { mockedApplications, mockedMyPulses } from "../mocks";
import { ApplicationCard, MyPulseCard } from "../components";
import { useTranslation } from "react-i18next";

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

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
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
        {selectedTabs === "pulses"
          ? mockedMyPulses.map((el) => <MyPulseCard key={el.id} {...el} />)
          : mockedApplications.map((el) => (
              <ApplicationCard key={el.id} {...el} />
            ))}
      </Group>
    </Panel>
  );
};
