import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  FEED: "feed",
  PROJECT: "project",
  MY_PULSE: "my-pulses",
  EDIT_PROJECT: "edit-project",
  PROFILE: "profile",
  NOTIFICATIONS: "notifications",
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.FEED, "/", []),
      createPanel(
        DEFAULT_VIEW_PANELS.PROFILE,
        `/${DEFAULT_VIEW_PANELS.PROFILE}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.NOTIFICATIONS,
        `/${DEFAULT_VIEW_PANELS.NOTIFICATIONS}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.PROJECT,
        `/${DEFAULT_VIEW_PANELS.PROJECT}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.MY_PULSE,
        `/${DEFAULT_VIEW_PANELS.MY_PULSE}`,
        []
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
