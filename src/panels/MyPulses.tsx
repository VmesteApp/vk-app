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
import { useTranslation } from "react-i18next";
import { Icon28AddOutline } from "@vkontakte/icons";
import { ApplicationsList, PulsesList } from "../components";
import { IApplication, IPulse } from "../types";
import api from "../network";
import { getStorageValue } from "../utils";
import { VMESTE_USER_ID } from "../constants";

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
  const [myApplications, setMyApplications] = useState<IApplication[]>([]);
  const [userID, setUserID] = useState<number>(0);

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
    const fetchMyApplications = async () => {
      try {
        const response = await api.get<{ application: IApplication[] }>(
          "/content/application/my/"
        );

        if (response.status === 200) {
          setMyApplications(response.data.application);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getUserID = async () => {
      const userID = await getStorageValue(VMESTE_USER_ID);

      setUserID(Number(userID));
    };

    fetchMyPulses();
    fetchMyApplications();
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
            currentUser={userID}
            handlePressPulse={handlePressPulse}
            handleFoundPulses={handleFindPulses}
            handleCreatePulse={handleCreatePulse}
          />
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
