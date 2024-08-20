import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Feed, MyProjects, Notifications, Profile, Project } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.FEED } =
    useActiveVkuiLocation();

  return (
    <SplitLayout>
      <SplitCol>
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
