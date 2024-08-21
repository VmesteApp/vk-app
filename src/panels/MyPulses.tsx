import { FC, ReactNode } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Placeholder,
  Tabs,
  HorizontalScroll,
  TabsItem,
} from "@vkontakte/vkui";
import {
  Icon24Advertising,
  Icon24HomeOutline,
  Icon24Like,
  Icon28ServicesOutline,
} from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

type TabType = {
  icon: ReactNode;
  title: string;
  panel: string;
  path: string;
};

const tabs: TabType[] = [
  {
    icon: <Icon24Advertising />,
    title: "Новый Импульс",
    path: "",
    panel: "",
  },
  {
    icon: <Icon24HomeOutline />,
    title: "Мои Импульсы",
    path: "",
    panel: "",
  },
  {
    icon: <Icon24Like />,
    title: "Заявки",
    path: "",
    panel: "",
  },
];

export const MyPulses: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Мои Импульсы
      </PanelHeader>

      <Group>
        <Tabs
          mode={"default"}
          layoutFillMode={"auto"}
          withScrollToSelectedTab
          scrollBehaviorToSelectedTab="center"
        >
          <HorizontalScroll arrowSize="m">
            {tabs.map((tab) => (
              <TabsItem
                selected={tab.panel === "groups"}
                disabled={false}
                onClick={() => {}}
                before={tab.icon}
              >
                {tab.title}
              </TabsItem>
            ))}
          </HorizontalScroll>
        </Tabs>
      </Group>
      <Group style={{ height: "1000px" }}>
        <Placeholder
          icon={<Icon28ServicesOutline width={56} height={56} />}
        ></Placeholder>
      </Group>
    </Panel>
  );
};
