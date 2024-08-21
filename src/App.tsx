import {
  View,
  SplitLayout,
  SplitCol,
  usePlatform,
  useAdaptivityConditionalRender,
  PanelHeader,
  Panel,
  Epic,
  Tabbar,
  TabbarItem,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import { Feed, MyPulses, Notifications, Profile, Project } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { SideBar, SideBarOption } from "./components";
import {
  Icon28FireOutline,
  Icon28NewsfeedOutline,
  Icon28UserCircleOutline,
} from "@vkontakte/icons";

const sideBarOptions: (SideBarOption & { panel?: string })[] = [
  { path: "/", panel: "feed", title: "Лента", icon: <Icon28NewsfeedOutline /> },
  {
    path: "/my-pulses",
    panel: "my-pulses",
    title: "Мои Импульсы",
    icon: <Icon28FireOutline />,
  },
  {
    path: "/profile",
    panel: "profile",
    title: "Профиль",
    icon: <Icon28UserCircleOutline />,
  },
];

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.FEED } =
    useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();

  const hasHeader = platform !== "vkcom";

  return (
    <SplitLayout center header={hasHeader && <PanelHeader delimiter="none" />}>
      {viewWidth.tabletPlus && (
        <SplitCol
          className={viewWidth.tabletPlus.className}
          fixed
          width={280}
          maxWidth={280}
        >
          <Panel>
            {hasHeader && <PanelHeader />}
            <SideBar
              activePanel={activePanel}
              options={sideBarOptions}
              onPress={(path) => routeNavigator.push(path)}
            />
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activePanel}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                {sideBarOptions.map(({ path, icon, title, panel }) => (
                  <TabbarItem
                    key={path}
                    onClick={() => routeNavigator.push(path)}
                    selected={activePanel === panel}
                    data-story={path}
                    text={title}
                  >
                    {icon}
                  </TabbarItem>
                ))}
              </Tabbar>
            )
          }
        >
          <View id="feed" activePanel="feed">
            <Feed id="feed" />
          </View>
          <View id="project" activePanel="project">
            <Project id="project" />
          </View>
          <View id="my-pulses" activePanel="my-pulses">
            <MyPulses id="my-pulses" />
          </View>
          <View id="profile" activePanel="profile">
            <Profile id="profile" />
            <Notifications id="notifications" />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
