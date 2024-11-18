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
  usePopout,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import {
  AboutApp,
  AdminPulse,
  AdminPulseApplications,
  AdminPulseSettings,
  AdminPulseTeam,
  ChangeLanguage,
  CreateComplaint,
  CreatePulse,
  Feed,
  MyPulses,
  ParticipantPulse,
  Profile,
  PulsePreview,
} from "./panels";
import { DEFAULT_VIEW_PANELS, PANELS_WITHOUT_TABBAR } from "./routes";
import { PulsesFilterModal, SideBar, SideBarOption } from "./components";
import {
  Icon28FireOutline,
  Icon28MenuOutline,
  Icon28NewsfeedOutline,
} from "@vkontakte/icons";
import { useEffect, useMemo } from "react";
import { authorize } from "./utils/authorize";
import { useTranslation } from "react-i18next";
import { useOnboarding } from "./utils";

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
  const { startOnboarding } = useOnboarding();
  const routerPopout = usePopout();

  const hasHeader = platform !== "vkcom";

  useEffect(() => {
    authorize();
    startOnboarding();
  }, []);

  const modal = (
    <ModalRoot activeModal={""}>
      <PulsesFilterModal id="test" />
    </ModalRoot>
  );

  const showTabbar = useMemo(
    () =>
      !PANELS_WITHOUT_TABBAR.includes(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        activePanel as any
      ),
    [activePanel]
  );

  return (
    <SplitLayout
      center
      popout={routerPopout}
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
            viewWidth.tabletMinus &&
            showTabbar && (
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
          <View id="pulse-preview" activePanel="pulse-preview">
            <PulsePreview id="pulse-preview" />
          </View>
          <View id="participant-pulse" activePanel="participant-pulse">
            <ParticipantPulse id="participant-pulse" />
          </View>
          <View id="admin-pulse" activePanel="admin-pulse">
            <AdminPulse id="admin-pulse" />
          </View>
          <View id="my-pulses" activePanel="my-pulses">
            <MyPulses id="my-pulses" />
          </View>
          <View id="profile" activePanel="profile">
            <Profile id="profile" />
          </View>
          <View id="create-pulse" activePanel="create-pulse">
            <CreatePulse id="create-pulse" />
          </View>
          <View id="change-language" activePanel="change-language">
            <ChangeLanguage id="change-language" />
          </View>
          <View id="about-app" activePanel="about-app">
            <AboutApp id="about-app" />
          </View>
          <View
            id="admin-pulse-applications"
            activePanel="admin-pulse-applications"
          >
            <AdminPulseApplications id="admin-pulse-applications" />
          </View>
          <View id="admin-pulse-settings" activePanel="admin-pulse-settings">
            <AdminPulseSettings id="admin-pulse-settings" />
          </View>
          <View id="admin-pulse-team" activePanel="admin-pulse-team">
            <AdminPulseTeam id="admin-pulse-team" />
          </View>
          <View id="create-complaint" activePanel="create-complaint">
            <CreateComplaint id="create-complaint" />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
