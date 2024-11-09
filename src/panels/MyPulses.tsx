import { FC, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  Group,
  Tabs,
  HorizontalScroll,
  TabsItem,
  Spinner,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { Icon28AddOutline } from "@vkontakte/icons";
import { ApplicationsList, PulsesList } from "../components";
import { IPulse } from "../types";
import { getStorageValue } from "../utils";
import { VMESTE_USER_ID } from "../constants";
import { useMyApplications, useMyPulses } from "../hook";

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

  const { myPulses, loading: loadingMyPulses } = useMyPulses();
  const { myApplications, loading: loadingMyApplications } =
    useMyApplications();
  const [userID, setUserID] = useState<number>(0);

  useEffect(() => {
    const getUserID = async () => {
      const userID = await getStorageValue(VMESTE_USER_ID);

      setUserID(Number(userID));
    };

    getUserID();
  }, []);

  const handlePressPulse = (pulse: IPulse) => {
    routeNavigator.push(
      pulse.founder_id === userID
        ? `/pulse/admin/${pulse.id}`
        : `/pulse/${pulse.id}`
    );
  };

  const handleFindPulses = () => {
    routeNavigator.push("/");
  };

  const handleCreatePulse = () => {
    routeNavigator.push("/pulse/create");
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={handleCreatePulse}>
            <Icon28AddOutline />
          </PanelHeaderButton>
        }
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
        {selectedTabs === "pulses" ? (
          loadingMyPulses ? (
            <Spinner />
          ) : (
            <PulsesList
              data={myPulses}
              currentUser={userID}
              handlePressPulse={handlePressPulse}
              handleFoundPulses={handleFindPulses}
              handleCreatePulse={handleCreatePulse}
            />
          )
        ) : loadingMyApplications ? (
          <Spinner />
        ) : (
          <ApplicationsList
            data={myApplications}
            handleFindPulses={handleFindPulses}
          />
        )}
      </Group>
    </Panel>
  );
};
