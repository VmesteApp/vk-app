import {
  View,
  SplitLayout,
  SplitCol,
  usePlatform,
  useAdaptivityConditionalRender,
  PanelHeader,
  Panel,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import { Feed, MyProjects, Notifications, Profile, Project } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { SideBar, SideBarOption } from "./components";
import {
  Icon28FireOutline,
  Icon28NewsfeedOutline,
  Icon28Notifications,
  Icon28UserCircleOutline,
} from "@vkontakte/icons";

const sideBarOptions: SideBarOption[] = [
  { path: "/", title: "Лента", icon: <Icon28NewsfeedOutline /> },
  { path: "/profile", title: "Профиль", icon: <Icon28UserCircleOutline /> },
  {
    path: "/my-projects",
    title: "Мои Импульсы",
    icon: <Icon28FireOutline />,
  },
  {
    path: "/notifications",
    title: "Уведомления",
    icon: <Icon28Notifications />,
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
        <View activePanel={activePanel}>
          <Feed id="feed" />
          <Project id="project" />
          <MyProjects id="my-projects" />
          <Profile id="profile" />
          <Notifications id="notifications" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
