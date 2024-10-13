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
  ModalRoot,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import { ChangeLanguage, Feed, MyPulses, Profile, Project } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { PulsesFilterModal, SideBar, SideBarOption } from "./components";
import {
  Icon28FireOutline,
  Icon28MenuOutline,
  Icon28NewsfeedOutline,
} from "@vkontakte/icons";
import { useEffect } from "react";
import { authorize } from "./utils/authorize";
import { useTranslation } from "react-i18next";

const sideBarOptions: (SideBarOption & { panel?: string })[] = [
  {
    path: "/",
    panel: "feed",
    title: "feed.title",
    icon: <Icon28NewsfeedOutline />,
  },
  {
    path: "/my-pulses",
    panel: "my-pulses",
    title: "myPulses.title",
    icon: <Icon28FireOutline />,
  },
  {
    path: "/profile",
    panel: "profile",
    title: "menu.title",
    icon: <Icon28MenuOutline />,
  },
];

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.FEED } =
    useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const { t } = useTranslation();

  const hasHeader = platform !== "vkcom";

  useEffect(() => {
    authorize();
  }, []);

  const modal = (
    <ModalRoot activeModal={""}>
      <PulsesFilterModal id="test" />
    </ModalRoot>
  );

  return (
    <SplitLayout
      center
      modal={modal}
      header={hasHeader && <PanelHeader delimiter="none" />}
    >
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
                    text={t(title)}
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
          </View>
          <View id="change-language" activePanel="change-language">
            <ChangeLanguage id="change-language" />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
