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
  PULSE: "pulse",
  MY_PULSE: "my-pulses",
  CREATE_PULSE: "create-pulse",
  EDIT_PROJECT: "edit-project",
  PROFILE: "profile",
  NOTIFICATIONS: "notifications",
  CHANGE_LANGUAGE: "change-language",
} as const;

export const PANELS_WITHOUT_TABBAR = [
  DEFAULT_VIEW_PANELS.PULSE,
  DEFAULT_VIEW_PANELS.CREATE_PULSE,
  DEFAULT_VIEW_PANELS.CHANGE_LANGUAGE,
];

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
        DEFAULT_VIEW_PANELS.PULSE,
        `/${DEFAULT_VIEW_PANELS.PULSE}/:id`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.CREATE_PULSE,
        `/${DEFAULT_VIEW_PANELS.PULSE}/create`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.MY_PULSE,
        `/${DEFAULT_VIEW_PANELS.MY_PULSE}`,
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.CHANGE_LANGUAGE,
        `/${DEFAULT_VIEW_PANELS.CHANGE_LANGUAGE}`,
        []
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
